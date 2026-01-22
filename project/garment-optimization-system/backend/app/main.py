from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from contextlib import asynccontextmanager
import time
import pandas as pd
import os
import random
import json
import asyncio
from concurrent.futures import ThreadPoolExecutor
import queue

from app.schemas import OptimizationRequest, OptimizationResponse, SampleDataResponse
from app.ml.model_loader import ModelLoader
from app.ml.evaluator import evaluate_system
from app.ml.optimizer import optimize_worker_allocation
from app.utils.validators import validate_teams

model_loader = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model_loader
    print("Loading ML artifacts...")
    model_loader = ModelLoader()
    model_loader.load_artifacts()
    print("ML artifacts loaded successfully!")
    yield
    print("Shutting down...")

app = FastAPI(
    title="Garment Production Optimizer",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Garment Production Optimization API",
        "status": "running",
        "endpoints": {
            "optimize": "POST /optimize",
            "health": "GET /health"
        }
    }

@app.get("/health")
def health_check():
    if model_loader is None or not model_loader.is_loaded():
        raise HTTPException(status_code=503, detail="ML models not loaded")
    return {
        "status": "healthy",
        "model_loaded": True
    }

@app.get("/sample-data", response_model=SampleDataResponse)
def get_sample_data(num_teams: int = Query(default=5, ge=1, le=50)):
    """Load random sample teams from the dataset"""
    try:
        dataset_path = os.path.join(os.path.dirname(__file__), '..', 'dataset', 'garment_production_dataset.csv')
        df = pd.read_csv(dataset_path)
        
        # Randomly sample rows
        sample_size = min(num_teams, len(df))
        sample_df = df.sample(n=sample_size, random_state=random.randint(1, 10000))
        
        teams = []
        for _, row in sample_df.iterrows():
            teams.append({
                "total_workers": int(row['total_workers']),
                "cutting_workers": int(row['cutting_workers']),
                "sewing_workers": int(row['sewing_workers']),
                "finishing_workers": int(row['finishing_workers']),
                "cutting_attendance": int(row['cutting_attendance']),
                "sewing_attendance": int(row['sewing_attendance']),
                "finishing_attendance": int(row['finishing_attendance']),
                "daily_target": int(row['daily_target'])
            })
        
        return SampleDataResponse(teams=teams, total_rows=len(df))
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Dataset file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load sample data: {str(e)}")

@app.post("/optimize", response_model=OptimizationResponse)
def optimize_teams(request: OptimizationRequest):
    start_time = time.time()
    
    try:
        # Validate input
        validate_teams(request.teams)
        
        # Convert to list of dicts
        teams = [team.dict() for team in request.teams]
        
        # Evaluate initial state
        initial_performance = evaluate_system(
            teams,
            model_loader.rf_model,
            model_loader.scaler,
            model_loader.feature_order,
            bottleneck_aware=True
        )
        
        # Deep copy for optimization
        import copy
        teams_for_opt = copy.deepcopy(teams)
        
        # Run optimization
        optimization_result = optimize_worker_allocation(
            teams_for_opt,
            model_loader.rf_model,
            model_loader.scaler,
            model_loader.feature_order,
            max_iterations=1000,
            temperature=2.0,
            cooling_rate=0.995,
            bottleneck_aware=True
        )
        
        computation_time = time.time() - start_time
        
        # Build response
        return OptimizationResponse(
            initial={
                "completion_rate": initial_performance['total_completion_rate'],
                "total_output": initial_performance['total_output'],
                "total_target": initial_performance['total_target']
            },
            final={
                "completion_rate": optimization_result['best_performance']['total_completion_rate'],
                "total_output": optimization_result['best_performance']['total_output'],
                "total_target": optimization_result['best_performance']['total_target']
            },
            teams_before=teams,
            teams_after=optimization_result['optimized_teams'],
            team_metrics_before=initial_performance.get('team_metrics', []),
            team_metrics_after=optimization_result['best_performance'].get('team_metrics', []),
            iterations=optimization_result['iterations'],
            migrations=optimization_result['migrations'],
            improvement_pct=optimization_result['improvement_pct'],
            gain=optimization_result['gain'],
            computation_time=computation_time,
            migration_log=optimization_result['migration_log']
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Optimization failed: {str(e)}")

@app.post("/optimize-stream")
async def optimize_teams_stream(request: OptimizationRequest):
    """Streaming endpoint that sends progress updates during optimization"""
    
    async def event_generator():
        try:
            # Validate input
            validate_teams(request.teams)
            
            # Convert to list of dicts
            teams = [team.dict() for team in request.teams]
            
            # Evaluate initial state
            initial_performance = evaluate_system(
                teams,
                model_loader.rf_model,
                model_loader.scaler,
                model_loader.feature_order,
                bottleneck_aware=True
            )
            
            # Send initial state
            yield f"data: {json.dumps({'type': 'init', 'initial_completion_rate': initial_performance['total_completion_rate']})}\n\n"
            
            # Deep copy for optimization
            import copy
            teams_for_opt = copy.deepcopy(teams)
            
            # Create a queue for progress updates
            progress_queue = queue.Queue()
            result_queue = queue.Queue()
            
            def sync_progress_callback(iteration, best_score):
                progress_queue.put({
                    'type': 'progress',
                    'iteration': iteration,
                    'best_completion_rate': best_score
                })
            
            # Run optimization in a separate thread
            def run_optimization():
                try:
                    start_time = time.time()
                    optimization_result = optimize_worker_allocation(
                        teams_for_opt,
                        model_loader.rf_model,
                        model_loader.scaler,
                        model_loader.feature_order,
                        max_iterations=1000,
                        temperature=2.0,
                        cooling_rate=0.995,
                        bottleneck_aware=True,
                        progress_callback=sync_progress_callback
                    )
                    computation_time = time.time() - start_time
                    result_queue.put((optimization_result, computation_time, None))
                except Exception as e:
                    result_queue.put((None, None, str(e)))
                finally:
                    progress_queue.put(None)  # Signal completion
            
            # Start optimization in thread
            executor = ThreadPoolExecutor(max_workers=1)
            future = executor.submit(run_optimization)
            
            # Stream progress updates as they come
            while True:
                try:
                    update = progress_queue.get(timeout=0.1)
                    if update is None:  # Optimization complete
                        break
                    yield f"data: {json.dumps(update)}\n\n"
                except queue.Empty:
                    await asyncio.sleep(0.01)
                    continue
            
            # Wait for result
            optimization_result, computation_time, error = result_queue.get()
            
            if error:
                raise Exception(error)
            
            # Send final result
            result = {
                'type': 'complete',
                'result': {
                    'initial': {
                        "completion_rate": initial_performance['total_completion_rate'],
                        "total_output": initial_performance['total_output'],
                        "total_target": initial_performance['total_target']
                    },
                    'final': {
                        "completion_rate": optimization_result['best_performance']['total_completion_rate'],
                        "total_output": optimization_result['best_performance']['total_output'],
                        "total_target": optimization_result['best_performance']['total_target']
                    },
                    'teams_before': teams,
                    'teams_after': optimization_result['optimized_teams'],
                    'team_metrics_before': initial_performance.get('team_metrics', []),
                    'team_metrics_after': optimization_result['best_performance'].get('team_metrics', []),
                    'iterations': optimization_result['iterations'],
                    'migrations': optimization_result['migrations'],
                    'improvement_pct': optimization_result['improvement_pct'],
                    'gain': optimization_result['gain'],
                    'computation_time': computation_time,
                    'migration_log': optimization_result['migration_log']
                }
            }
            yield f"data: {json.dumps(result)}\n\n"
            
            executor.shutdown(wait=False)
            
        except Exception as e:
            error_data = {'type': 'error', 'message': str(e)}
            yield f"data: {json.dumps(error_data)}\n\n"
    
    return StreamingResponse(event_generator(), media_type="text/event-stream")

