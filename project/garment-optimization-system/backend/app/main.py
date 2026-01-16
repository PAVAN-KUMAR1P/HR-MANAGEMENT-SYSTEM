from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import time

from app.schemas import OptimizationRequest, OptimizationResponse
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
