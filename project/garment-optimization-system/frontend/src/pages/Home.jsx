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
                <p>
                    This system optimizes worker allocation across multiple production teams to maximize
                    overall output. It uses machine learning to predict team performance and intelligently
                    reallocates workers from departments with excess capacity to bottleneck departments.
                </p>

                <h3>Key Features:</h3>
                <ul>
                    <li><strong>🤖 ML-Based Prediction:</strong> Random Forest model predicts team completion rates</li>
                    <li><strong>⚠️ Bottleneck Awareness:</strong> Respects sequential workflow (Cutting → Sewing → Finishing)</li>
                    <li><strong>🔄 Smart Optimization:</strong> Simulated Annealing finds optimal worker distribution</li>
                    <li><strong>⚡ Real-Time Results:</strong> See immediate impact of optimizations</li>
                </ul>

                <div style={{ marginTop: '30px', textAlign: 'center', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                <ol>
                    <li><strong>Step 1:</strong> Enter your team configurations (workers, attendance, targets)</li>
                    <li><strong>Step 2:</strong> System evaluates current performance using ML model</li>
                    <li><strong>Step 3:</strong> Optimization algorithm migrates workers between teams</li>
                    <li><strong>Step 4:</strong> View improved allocation and expected output gains</li>
                </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginTop: '30px' }}>
                <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <h3 style={{ color: 'var(--primary)' }}>📊 Data-Driven</h3>
                    <p>Uses machine learning trained on production data to make accurate predictions</p>
                </div>
                <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                    <h3 style={{ color: 'var(--secondary)' }}>🎯 Constraint-Aware</h3>
                    <p>Respects real-world constraints like worker capacity and attendance limits</p>
                </div>
                <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
                    <h3 style={{ color: 'var(--success)' }}>⚡ Fast & Scalable</h3>
                    <p>Converges in seconds and works with any number of production teams</p>
                </div>
            </div>
        </div>
    )
}

export default Home
