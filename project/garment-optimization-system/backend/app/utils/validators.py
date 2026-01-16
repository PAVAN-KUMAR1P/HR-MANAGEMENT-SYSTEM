def validate_teams(teams):
    """Validate team data before optimization"""
    
    if not teams or len(teams) == 0:
        raise ValueError("At least one team is required")
    
    for idx, team in enumerate(teams):
        team_dict = team.dict() if hasattr(team, 'dict') else team
        
        # Check worker sum
        worker_sum = (
            team_dict['cutting_workers'] +
            team_dict['sewing_workers'] +
            team_dict['finishing_workers']
        )
        
        if worker_sum != team_dict['total_workers']:
            raise ValueError(
                f"Team {idx+1}: Sum of department workers ({worker_sum}) "
                f"must equal total_workers ({team_dict['total_workers']})"
            )
        
        # Check attendance constraints
        if team_dict['cutting_attendance'] > team_dict['cutting_workers']:
            raise ValueError(f"Team {idx+1}: cutting_attendance exceeds cutting_workers")
        
        if team_dict['sewing_attendance'] > team_dict['sewing_workers']:
            raise ValueError(f"Team {idx+1}: sewing_attendance exceeds sewing_workers")
        
        if team_dict['finishing_attendance'] > team_dict['finishing_workers']:
            raise ValueError(f"Team {idx+1}: finishing_attendance exceeds finishing_workers")
        
        # Check minimum attendance
        if team_dict['cutting_attendance'] < 1:
            raise ValueError(f"Team {idx+1}: cutting_attendance must be at least 1")
        
        if team_dict['sewing_attendance'] < 1:
            raise ValueError(f"Team {idx+1}: sewing_attendance must be at least 1")
        
        if team_dict['finishing_attendance'] < 1:
            raise ValueError(f"Team {idx+1}: finishing_attendance must be at least 1")
    
    return True
