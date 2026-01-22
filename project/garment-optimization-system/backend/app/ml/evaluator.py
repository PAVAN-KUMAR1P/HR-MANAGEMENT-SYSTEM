from app.ml.feature_builder import build_team_features

def evaluate_system(teams, rf_model, scaler, feature_order, bottleneck_aware=True):
    """
    Evaluate total system performance using ML model.
    
    CRITICAL: Bottleneck-aware evaluation
    In sequential production: final_output = min(cutting, sewing, finishing)
    
    Args:
        teams: list of team dicts
        rf_model: loaded RandomForest model
        scaler: loaded StandardScaler
        feature_order: list of feature names
        bottleneck_aware: if True, apply bottleneck penalty
    
    Returns:
        dict with total_completion_rate, total_output, and team_metrics
    """
    total_predicted_output = 0
    total_target = 0
    team_metrics = []
    
    for team in teams:
        features = build_team_features(team)
        feature_vector = [features[f] for f in feature_order]
        feature_scaled = scaler.transform([feature_vector])
        
        # ML model prediction
        predicted_rate = rf_model.predict(feature_scaled)[0]
        
        if bottleneck_aware:
            # Apply bottleneck penalty
            cutting_ratio = team['cutting_attendance'] / team['cutting_workers']
            sewing_ratio = team['sewing_attendance'] / team['sewing_workers']
            finishing_ratio = team['finishing_attendance'] / team['finishing_workers']
            
            # Bottleneck is the department with lowest utilization
            bottleneck_factor = min(cutting_ratio, sewing_ratio, finishing_ratio)
            
            # Apply penalty
            effective_rate = predicted_rate * (0.3 + 0.7 * bottleneck_factor)
        else:
            effective_rate = predicted_rate
        
        predicted_output = effective_rate * team['daily_target']
        
        team_metrics.append({
            'completion_rate': effective_rate,
            'output': predicted_output,
            'target': team['daily_target']
        })
        
        total_predicted_output += predicted_output
        total_target += team['daily_target']
    
    total_completion_rate = total_predicted_output / total_target
    
    return {
        'total_completion_rate': total_completion_rate,
        'total_output': total_predicted_output,
        'total_target': total_target,
        'team_metrics': team_metrics
    }
