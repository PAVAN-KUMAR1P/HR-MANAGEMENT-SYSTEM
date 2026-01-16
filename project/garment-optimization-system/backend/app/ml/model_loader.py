import joblib
import os

class ModelLoader:
    def __init__(self):
        self.rf_model = None
        self.scaler = None
        self.feature_order = None
        self.artifacts_path = os.path.join(os.path.dirname(__file__), '..', '..', 'artifacts')
    
    def load_artifacts(self):
        """Load ML artifacts once at startup"""
        try:
            self.rf_model = joblib.load(os.path.join(self.artifacts_path, 'rf_completion_model.pkl'))
            self.scaler = joblib.load(os.path.join(self.artifacts_path, 'scaler.pkl'))
            self.feature_order = joblib.load(os.path.join(self.artifacts_path, 'feature_order.pkl'))
            
            print(f"✓ Loaded Random Forest model")
            print(f"✓ Loaded StandardScaler")
            print(f"✓ Loaded feature order ({len(self.feature_order)} features)")
            
        except Exception as e:
            raise RuntimeError(f"Failed to load ML artifacts: {str(e)}")
    
    def is_loaded(self):
        """Check if all artifacts are loaded"""
        return all([
            self.rf_model is not None,
            self.scaler is not None,
            self.feature_order is not None
        ])
