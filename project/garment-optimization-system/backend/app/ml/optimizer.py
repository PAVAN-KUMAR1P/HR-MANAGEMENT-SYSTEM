import numpy as np
import copy

from app.ml.evaluator import evaluate_system

def optimize_worker_allocation(
    teams,
    rf_model,
    scaler,
    feature_order,
    max_iterations=1000,
    temperature=2.0,
    cooling_rate=0.995,
    bottleneck_aware=True
):
    """
    Optimize worker allocation with bottleneck awareness.
    
    Migration Rules:
    - Only workers within same department can be migrated
    - Cannot exceed department capacity
    - Attendance must stay >= 1
    
    Args:
        teams: list of team configurations
        rf_model: loaded RandomForest model
        scaler: loaded StandardScaler
        feature_order: list of feature names
        max_iterations: maximum optimization steps
        temperature: initial temperature for annealing
        cooling_rate: cooling schedule
        bottleneck_aware: enable bottleneck penalty
    
    Returns:
        dict with optimized teams and performance metrics
    """
    
    # Deep copy teams
    current_teams = copy.deepcopy(teams)
    best_teams = copy.deepcopy(teams)
    
    # Evaluate initial state
    current_performance = evaluate_system(current_teams, rf_model, scaler, feature_order, bottleneck_aware)
    best_performance = current_performance
    
    current_score = current_performance['total_completion_rate']
    best_score = current_score
    
    # Optimization loop
    improvements = 0
    no_improvement_count = 0
    accepted_worse = 0
    
    migration_log = {'cutting': 0, 'sewing': 0, 'finishing': 0}
    
    for iteration in range(max_iterations):
        # Random migration attempt
        dept = np.random.choice(['cutting', 'sewing', 'finishing'])
        
        # Pick two different teams
        if len(current_teams) < 2:
            break
        
        team_from_idx, team_to_idx = np.random.choice(len(current_teams), 2, replace=False)
        team_from = current_teams[team_from_idx]
        team_to = current_teams[team_to_idx]
        
        # Check if migration is possible
        from_attendance = team_from[f'{dept}_attendance']
        to_attendance = team_to[f'{dept}_attendance']
        to_capacity = team_to[f'{dept}_workers']
        
        if from_attendance <= 1 or to_attendance >= to_capacity:
            continue
        
        # Perform migration
        team_from[f'{dept}_attendance'] -= 1
        team_to[f'{dept}_attendance'] += 1
        
        # Evaluate new state
        new_performance = evaluate_system(current_teams, rf_model, scaler, feature_order, bottleneck_aware)
        new_score = new_performance['total_completion_rate']
        
        # Acceptance criteria (Simulated Annealing)
        delta = new_score - current_score
        
        if delta > 0:
            # Improvement - always accept
            current_score = new_score
            improvements += 1
            no_improvement_count = 0
            migration_log[dept] += 1
            
            if new_score > best_score:
                best_score = new_score
                best_performance = new_performance
                best_teams = copy.deepcopy(current_teams)
        else:
            # Non-improvement - accept with probability
            acceptance_prob = np.exp(delta / temperature)
            if np.random.random() < acceptance_prob:
                current_score = new_score
                no_improvement_count = 0
                accepted_worse += 1
            else:
                # Reject - revert migration
                team_from[f'{dept}_attendance'] += 1
                team_to[f'{dept}_attendance'] -= 1
                no_improvement_count += 1
        
        # Cool down temperature
        temperature *= cooling_rate
        
        # Early stopping
        if no_improvement_count > 200:
            break
    
    # Calculate gains
    initial_performance = evaluate_system(teams, rf_model, scaler, feature_order, bottleneck_aware)
    gain = best_performance['total_output'] - initial_performance['total_output']
    improvement_pct = ((best_performance['total_completion_rate'] /
                       initial_performance['total_completion_rate']) - 1) * 100
    
    return {
        'optimized_teams': best_teams,
        'best_performance': best_performance,
        'initial_performance': initial_performance,
        'gain': gain,
        'improvement_pct': improvement_pct,
        'iterations': iteration + 1,
        'migrations': improvements,
        'accepted_worse': accepted_worse,
        'migration_log': migration_log
    }
