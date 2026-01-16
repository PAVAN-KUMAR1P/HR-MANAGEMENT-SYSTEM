import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="container">
            <div className="header">
                <h1>🏭 Garment Production Optimizer</h1>
                <p>ML-Powered Worker Allocation with Bottleneck Awareness</p>
            </div>

            <div className="card">
                <h2>What This System Does</h2>
                <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
                    This system optimizes worker allocation across multiple production teams to maximize
                    overall output. It uses machine learning to predict team performance and intelligently
                    reallocates workers from departments with excess capacity to bottleneck departments.
                </p>

                <h3 style={{ marginTop: '25px' }}>Key Features:</h3>
                <ul style={{ marginTop: '10px', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li><strong>ML-Based Prediction:</strong> Random Forest model predicts team completion rates</li>
                    <li><strong>Bottleneck Awareness:</strong> Respects sequential workflow (Cutting → Sewing → Finishing)</li>
                    <li><strong>Smart Optimization:</strong> Simulated Annealing finds optimal worker distribution</li>
                    <li><strong>Real-Time Results:</strong> See immediate impact of optimizations</li>
                </ul>

                <div style={{ marginTop: '30px', textAlign: 'center', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <Link to="/input" className="btn">
                        Start Optimization →
                    </Link>
                    <Link to="/about" className="btn btn-secondary">
                        Learn More
                    </Link>
                </div>
            </div>

            <div className="card">
                <h3>How It Works</h3>
                <ol style={{ marginTop: '10px', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>Enter your team configurations (workers, attendance, targets)</li>
                    <li>System evaluates current performance using ML model</li>
                    <li>Optimization algorithm migrates workers between teams</li>
                    <li>View improved allocation and expected output gains</li>
                </ol>
            </div>
        </div>
    )
}

export default Home
