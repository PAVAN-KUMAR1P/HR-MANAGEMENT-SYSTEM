# Garment Production Optimizer

ML-powered worker allocation system with bottleneck-aware optimization.

## 🎯 Project Overview

This system optimizes worker allocation across garment production teams using:
- **Machine Learning**: Random Forest model for completion rate prediction
- **Bottleneck Awareness**: Respects sequential workflow (Cutting → Sewing → Finishing)
- **Smart Optimization**: Simulated Annealing algorithm for optimal worker distribution
- **Real-Time Results**: Immediate visualization of optimization impact

## 📁 Project Structure

```
garment-optimization-system/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py      # API endpoints
│   │   ├── schemas.py   # Pydantic models
│   │   ├── ml/          # ML modules
│   │   │   ├── model_loader.py
│   │   │   ├── feature_builder.py
│   │   │   ├── evaluator.py
│   │   │   └── optimizer.py
│   │   └── utils/       # Utilities
│   │       └── validators.py
│   ├── artifacts/       # ML model files
│   └── requirements.txt
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── pages/       # Route pages
│   │   ├── components/  # Reusable components
│   │   ├── services/    # API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── docs/
    └── prd/             # Product requirements
```

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Ensure ML artifacts are in place:**
   Place these files in `backend/artifacts/`:
   - `rf_completion_model.pkl`
   - `scaler.pkl`
   - `feature_order.pkl`

6. **Run the backend:**
   ```bash
   uvicorn app.main:app --reload
   ```

   Backend will be available at: **http://localhost:8000**

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   Frontend will be available at: **http://localhost:3000**

## 📖 Usage

1. Open **http://localhost:3000** in your browser
2. Click **"Start Optimization"**
3. Configure your production teams:
   - Enter worker counts per department
   - Set attendance numbers
   - Define daily targets
4. Click **"Run Optimization"**
5. View the optimized results with before/after comparison

## 🔌 API Documentation

Interactive API documentation is available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| POST | `/optimize` | Run optimization |

## 🧪 Example API Request

```bash
curl -X POST http://localhost:8000/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "teams": [
      {
        "total_workers": 120,
        "cutting_workers": 40,
        "sewing_workers": 50,
        "finishing_workers": 30,
        "cutting_attendance": 35,
        "sewing_attendance": 25,
        "finishing_attendance": 28,
        "daily_target": 1000
      }
    ]
  }'
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Scikit-learn** - Machine learning library
- **Pandas** - Data processing
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Vite** - Build tool
- **Vanilla CSS** - Styling

## 📊 Features

### ML Model
- **Algorithm**: Random Forest Regressor
- **Features**: 20+ engineered features including attendance ratios, capacity pressure
- **Bottleneck Detection**: Identifies sequential workflow constraints

### Optimization
- **Algorithm**: Simulated Annealing
- **Constraints**: Respects department capacity and minimum attendance
- **Migrations**: Department-specific worker reallocation

### UI/UX
- **Responsive Design**: Works on all screen sizes
- **Real-time Feedback**: Loading states and error handling
- **Visual Comparisons**: Before/after tables with highlighting
- **Summary Metrics**: KPI cards with delta indicators

## 📝 ML Artifacts

The system requires three pre-trained ML artifacts:

1. **rf_completion_model.pkl** - Trained Random Forest model
2. **scaler.pkl** - StandardScaler for feature normalization
3. **feature_order.pkl** - Feature column ordering

> **Note**: These artifacts must be generated separately using your training data and placed in `backend/artifacts/`.

## 🔒 Security Notes

- CORS is enabled for all origins in development
- Input validation via Pydantic schemas
- No authentication required (development mode)

## 🐛 Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed
- Check that ML artifacts exist in `backend/artifacts/`
- Verify all dependencies are installed

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check CORS settings in `backend/app/main.py`
- Verify API_BASE_URL in `frontend/src/services/api.js`

### Optimization fails
- Check team data validation (worker sums, attendance limits)
- Ensure at least 2 teams for optimization
- Review backend logs for detailed error messages

## 📄 License

This project is for educational and internal use.

## 👥 Contributors

Development Team - Garment Production Optimization System

---

**System Status**: ✅ Complete and Ready for Deployment
