from pydantic import BaseModel, Field, field_validator
from typing import List, Dict

class Team(BaseModel):
    total_workers: int = Field(..., gt=0)
    cutting_workers: int = Field(..., gt=0)
    sewing_workers: int = Field(..., gt=0)
    finishing_workers: int = Field(..., gt=0)
    cutting_attendance: int = Field(..., gt=0)
    sewing_attendance: int = Field(..., gt=0)
    finishing_attendance: int = Field(..., gt=0)
    daily_target: int = Field(..., gt=0)
    
    @field_validator('cutting_attendance')
    def validate_cutting_attendance(cls, v, info):
        if 'cutting_workers' in info.data and v > info.data['cutting_workers']:
            raise ValueError('cutting_attendance cannot exceed cutting_workers')
        return v
    
    @field_validator('sewing_attendance')
    def validate_sewing_attendance(cls, v, info):
        if 'sewing_workers' in info.data and v > info.data['sewing_workers']:
            raise ValueError('sewing_attendance cannot exceed sewing_workers')
        return v
    
    @field_validator('finishing_attendance')
    def validate_finishing_attendance(cls, v, info):
        if 'finishing_workers' in info.data and v > info.data['finishing_workers']:
            raise ValueError('finishing_attendance cannot exceed finishing_workers')
        return v

class OptimizationRequest(BaseModel):
    teams: List[Team] = Field(..., min_length=1)

class PerformanceMetrics(BaseModel):
    completion_rate: float
    total_output: float
    total_target: float

class OptimizationResponse(BaseModel):
    initial: PerformanceMetrics
    final: PerformanceMetrics
    teams_before: List[Dict]
    teams_after: List[Dict]
    iterations: int
    migrations: int
    improvement_pct: float
    gain: float
    computation_time: float
    migration_log: Dict[str, int]
