# 🏭 Garment Production Optimizer

<div align="center">

![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.4-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

**An ML-powered worker allocation system with bottleneck-aware optimization for garment production lines.**

[Features](#-features) •
[Installation](#-installation) •
[Usage](#-usage) •
[API Documentation](#-api-documentation) •
[Tech Stack](#-tech-stack)

</div>

---

## 🎯 Overview

The Garment Production Optimizer is an intelligent system designed to maximize production efficiency by optimally allocating workers across different production stages. It uses machine learning to predict completion rates and employs simulated annealing algorithms to find the best worker distribution.

### Key Capabilities

- **🤖 Machine Learning Prediction**: Random Forest model trained on production data to predict completion rates
- **🔄 Bottleneck-Aware Optimization**: Respects the sequential workflow (Cutting → Sewing → Finishing)
- **⚡ Smart Worker Allocation**: Simulated Annealing algorithm for optimal worker distribution
- **📊 Real-Time Visualization**: Interactive charts showing optimization results and improvements
- **📈 Performance Analytics**: Detailed metrics on production efficiency and worker utilization

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Team Input Management** | Add multiple production teams with worker counts and attendance data |
| **Sample Data Loading** | Load sample teams from the included dataset for testing |
| **Optimization Engine** | ML-based optimization with configurable number of iterations |
| **Results Dashboard** | Comprehensive visualization of before/after optimization metrics |
| **Bottleneck Analysis** | Identify and visualize production bottlenecks |
| **Worker Migration Tracking** | Track recommended worker movements between stages |

---

## 📁 Project Structure

```
garment-optimization-system/
│
├── 📂 backend/                    # FastAPI Backend Service
│   ├── 📂 app/
│   │   ├── main.py               # API endpoints & server configuration
│   │   ├── schemas.py            # Pydantic data models
│   │   ├── 📂 ml/                # Machine Learning modules
│   │   │   ├── model_loader.py   # Load ML artifacts
│   │   │   ├── feature_builder.py# Feature engineering
│   │   │   ├── evaluator.py      # Model evaluation
│   │   │   └── optimizer.py      # Simulated annealing optimizer
│   │   └── 📂 utils/
│   │       └── validators.py     # Input validation
│   ├── 📂 artifacts/             # ML model files (.pkl)
│   ├── 📂 dataset/               # Training dataset
│   └── requirements.txt          # Python dependencies
│
├── 📂 frontend/                   # React Frontend Application
│   ├── 📂 src/
│   │   ├── 📂 pages/             # Route pages
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── InputTeams.jsx    # Team input form
│   │   │   ├── Results.jsx       # Optimization results
│   │   │   └── About.jsx         # About page
│   │   ├── 📂 components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── TeamForm.jsx
│   │   │   ├── TeamTable.jsx
│   │   │   └── 📂 Charts/        # Visualization components
│   │   ├── 📂 services/
│   │   │   └── api.js            # API client
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- **Python** 3.9 or higher
- **Node.js** 18 or higher
- **npm** or **yarn**

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   # Create virtual environment
   python -m venv venv

   # Activate (Windows)
   venv\Scripts\activate

   # Activate (macOS/Linux)
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Verify ML artifacts exist in `backend/artifacts/`:**
   - `rf_completion_model.pkl` - Trained Random Forest model
   - `scaler.pkl` - Feature scaler
   - `feature_order.pkl` - Feature ordering metadata

5. **Start the backend server:**
   ```bash
   uvicorn app.main:app --reload
   ```

   ✅ Backend running at: **http://localhost:8000**

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   ✅ Frontend running at: **http://localhost:5173**

---

## 💻 Usage

### Quick Start

1. **Start both servers** (backend and frontend)
2. **Open the application** at `http://localhost:5173`
3. **Navigate to "Input Teams"** to add production teams
4. **Enter team data** or click "Load Sample Data" for demo
5. **Click "Optimize"** to run the ML optimization
6. **View Results** with detailed charts and recommendations

### Input Parameters

| Parameter | Description | Range |
|-----------|-------------|-------|
| `total_workers` | Total workers in the team | 1-1000 |
| `cutting_workers` | Workers in cutting stage | 1-500 |
| `sewing_workers` | Workers in sewing stage | 1-500 |
| `finishing_workers` | Workers in finishing stage | 1-500 |
| `cutting_attendance` | Attendance % for cutting | 0-100 |
| `sewing_attendance` | Attendance % for sewing | 0-100 |
| `finishing_attendance` | Attendance % for finishing | 0-100 |
| `daily_target` | Daily production target | 1-10000 |

---

## 📖 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API status and available endpoints |
| `GET` | `/health` | Health check with model status |
| `GET` | `/sample-data` | Get random sample teams from dataset |
| `POST` | `/optimize` | Run optimization on provided teams |

### Interactive Documentation

Once the backend is running, access the interactive API docs:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Example Request

```bash
curl -X POST "http://localhost:8000/optimize" \
  -H "Content-Type: application/json" \
  -d '{
    "teams": [
      {
        "total_workers": 50,
        "cutting_workers": 15,
        "sewing_workers": 20,
        "finishing_workers": 15,
        "cutting_attendance": 90,
        "sewing_attendance": 85,
        "finishing_attendance": 88,
        "daily_target": 500
      }
    ],
    "optimization_iterations": 100
  }'
```

---

## 🛠 Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Pydantic** - Data validation using Python type annotations
- **scikit-learn** - Machine learning library
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **Vite** - Next-generation frontend tooling
- **React Router** - Client-side routing

### Machine Learning
- **Random Forest Regressor** - Completion rate prediction
- **Simulated Annealing** - Optimization algorithm
- **Feature Engineering** - Bottleneck ratios, attendance normalization

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest test_ml.py -v
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `HOST` | `0.0.0.0` | Backend host |
| `PORT` | `8000` | Backend port |
| `RELOAD` | `true` | Hot reload for development |

### Frontend Configuration

Edit `frontend/vite.config.js` to customize:
- Development server port
- API proxy settings
- Build output directory

---

## 📊 How It Works

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Input    │───▶│  Feature Build  │───▶│   ML Predict    │
│   (Team Data)   │    │  (Bottlenecks)  │    │  (Completion)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Results &    │◀───│   Evaluation    │◀───│   Optimization  │
│  Visualization  │    │   & Metrics     │    │  (Sim Anneal)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

1. **Input**: User provides team worker distribution and attendance data
2. **Feature Engineering**: Calculate bottleneck ratios and normalize features
3. **ML Prediction**: Random Forest predicts completion rate
4. **Optimization**: Simulated Annealing finds optimal worker allocation
5. **Evaluation**: Compare before/after metrics
6. **Visualization**: Display results with interactive charts

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

<div align="center">
Made with ❤️ for optimizing garment production
</div>

---

### **Running After First Setup**

Once you've completed the first-time setup, you only need these commands:

#### Start Backend
```bash
cd backend
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Linux/Mac
uvicorn app.main:app --reload
```

#### Start Frontend
```bash
cd frontend
npm run dev
```

**Quick Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

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
