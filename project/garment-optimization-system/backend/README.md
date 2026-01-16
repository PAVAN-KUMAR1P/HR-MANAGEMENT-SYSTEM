# Garment Production Optimizer - Backend

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Ensure ML artifacts are in `artifacts/` folder:
   - rf_completion_model.pkl
   - scaler.pkl
   - feature_order.pkl

## Run
```bash
uvicorn app.main:app --reload
```

API will be available at: http://localhost:8000

## API Documentation

Interactive docs: http://localhost:8000/docs
