def build_team_features(team_data):
    """
    Build ML features from team data.
    Identical to original logic - no leakage.
    """
    features = {}
    
    # Original features
    features['total_workers'] = team_data['total_workers']
    features['cutting_workers'] = team_data['cutting_workers']
    features['sewing_workers'] = team_data['sewing_workers']
    features['finishing_workers'] = team_data['finishing_workers']
    features['cutting_attendance'] = team_data['cutting_attendance']
    features['sewing_attendance'] = team_data['sewing_attendance']
    features['finishing_attendance'] = team_data['finishing_attendance']
    features['daily_target'] = team_data['daily_target']
    
    # Engineered features
    features['attendance_ratio_cutting'] = team_data['cutting_attendance'] / team_data['cutting_workers']
    features['attendance_ratio_sewing'] = team_data['sewing_attendance'] / team_data['sewing_workers']
    features['attendance_ratio_finishing'] = team_data['finishing_attendance'] / team_data['finishing_workers']
    
    total_attendance = (
        team_data['cutting_attendance'] +
        team_data['sewing_attendance'] +
        team_data['finishing_attendance']
    )
    features['overall_attendance_ratio'] = total_attendance / team_data['total_workers']
    
    features['cutting_worker_ratio'] = team_data['cutting_workers'] / team_data['total_workers']
    features['sewing_worker_ratio'] = team_data['sewing_workers'] / team_data['total_workers']
    features['finishing_worker_ratio'] = team_data['finishing_workers'] / team_data['total_workers']
    
    features['target_per_worker'] = team_data['daily_target'] / team_data['total_workers']
    
    features['cutting_capacity_pressure'] = team_data['daily_target'] / (team_data['cutting_attendance'] + 1)
    features['sewing_capacity_pressure'] = team_data['daily_target'] / (team_data['sewing_attendance'] + 1)
    features['finishing_capacity_pressure'] = team_data['daily_target'] / (team_data['finishing_attendance'] + 1)
    
    return features
