import React from 'react'
import { Link } from 'react-router-dom'

function About() {
    return (
        <div className="container">
            <div className="header">
                <h1>📚 About the System</h1>
                <p>Understanding ML-Powered Optimization</p>
            </div>

            <div className="card">
                <h2>🎯 What Problem Does This Solve?</h2>
                <p>
                    In garment manufacturing, production flows sequentially through three departments:
                    <strong> Cutting → Sewing → Finishing</strong>. When one department has low attendance
                    while others are fully staffed, it creates a <strong>bottleneck</strong> that limits
                    overall output.
                </p>
                <p>
                    This system intelligently reallocates workers from over-staffed departments to
                    bottleneck departments, maximizing total production output.
                </p>
            </div>

            <div className="card">
                <h2>🔬 The Bottleneck Theory</h2>
                <h3>Sequential Production Flow</h3>
                <p>
                    Garment production is <strong>sequential</strong>, not parallel:
                </p>
                <div style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%)',
                    padding: '25px',
                    borderRadius: '8px',
                    marginTop: '15px',
                    fontFamily: 'monospace',
                    borderLeft: '4px solid var(--primary)'
                }}>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>📍 Step 1:</strong> Cutting Department cuts fabric
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>📍 Step 2:</strong> Sewing Department assembles garments
                    </div>
                    <div>
                        <strong>📍 Step 3:</strong> Finishing Department completes final touches
                    </div>
                </div>

                <h3>The Bottleneck Effect</h3>
                <p>
                    <strong>Key Principle:</strong> Final output = min(Cutting, Sewing, Finishing)
                </p>
                <div style={{
                    background: 'linear-gradient(135deg, #fffbea 0%, #fff8e1 100%)',
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '15px',
                    border: '2px solid var(--warning)',
                    boxShadow: 'inset 0 0 10px rgba(255,193,7,0.1)'
                }}>
                    <strong>⚠️ Example Scenario:</strong><br />
                    • Cutting: 100 pieces/day ✓<br />
                    • Sewing: 50 pieces/day ❌ (BOTTLENECK)<br />
                    • Finishing: 120 pieces/day ✓<br />
                    <br />
                    <strong>Result:</strong> Only 50 pieces/day total (limited by sewing)
                </div>
            </div>

            <div className="card">
                <h2>🤖 How Machine Learning Helps</h2>
                <h3>Random Forest Model</h3>
                <p>
                    Our ML model predicts team completion rates based on:
                </p>
                <ul>
                    <li><strong>Worker allocation</strong> (cutting, sewing, finishing)</li>
                    <li><strong>Attendance ratios</strong> (actual vs capacity)</li>
                    <li><strong>Capacity pressure</strong> (target per worker)</li>
                    <li><strong>Historical performance</strong> patterns</li>
                </ul>

                <h3>Feature Engineering</h3>
                <p>
                    The model uses <strong>20+ engineered features</strong> including:
                </p>
                <div style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%)',
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '15px',
                    borderLeft: '4px solid var(--info)'
                }}>
                    • Attendance ratios per department<br />
                    • Worker distribution ratios<br />
                    • Target per worker metrics<br />
                    • Capacity pressure indicators<br />
                    • Overall attendance efficiency
                </div>
            </div>

            <div className="card">
                <h2>⚙️ The Optimization Algorithm</h2>
                <h3>Simulated Annealing</h3>
                <p>
                    We use <strong>Simulated Annealing</strong>, a probabilistic optimization technique
                    inspired by metallurgy:
                </p>

                <div style={{ marginTop: '20px' }}>
                    <h4>How It Works:</h4>
                    <ol>
                        <li><strong>Start</strong> with current team configuration</li>
                        <li><strong>Randomly migrate</strong> one worker between teams</li>
                        <li><strong>Evaluate</strong> new configuration with ML model</li>
                        <li><strong>Accept or reject</strong> based on improvement</li>
                        <li><strong>Cool down</strong> temperature (reduce randomness)</li>
                        <li><strong>Repeat</strong> until convergence</li>
                    </ol>
                </div>

                <h3>Migration Rules</h3>
                <div style={{
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '15px',
                    border: '2px solid var(--info)',
                    boxShadow: 'inset 0 0 10px rgba(33,150,243,0.1)'
                }}>
                    <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: 'var(--success)' }}>✅ Allowed:</strong><br />
                        • Move workers within same department (cutting to cutting)<br />
                        • Respect department capacity limits<br />
                        • Maintain minimum attendance (≥1 per department)<br />
                    </div>
                    <div>
                        <strong style={{ color: 'var(--danger)' }}>❌ Not Allowed:</strong><br />
                        • Cross-department moves (cutting to sewing)<br />
                        • Exceed worker capacity<br />
                        • Leave department empty
                    </div>
                </div>
            </div>

            <div className="card">
                <h2>📊 Why This Approach Works</h2>
                <div style={{ marginTop: '15px' }}>
                    <h3 style={{ color: 'var(--success)' }}>✅ Advantages</h3>
                    <ul>
                        <li><strong>Data-Driven:</strong> Uses actual historical performance</li>
                        <li><strong>Bottleneck-Aware:</strong> Respects sequential workflow</li>
                        <li><strong>Constraint-Respecting:</strong> Follows real-world rules</li>
                        <li><strong>Scalable:</strong> Works with any number of teams</li>
                        <li><strong>Fast:</strong> Converges in seconds</li>
                    </ul>
                </div>

                <div style={{ marginTop: '25px' }}>
                    <h3 style={{ color: 'var(--primary)' }}>🎯 Expected Results</h3>
                    <ul>
                        <li>5-15% improvement in completion rates</li>
                        <li>Better department balance</li>
                        <li>Reduced bottlenecks</li>
                        <li>Higher overall output</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <h2>🔍 Technical Details</h2>
                <table style={{ marginTop: '15px' }}>
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Technology</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>🤖 ML Model</strong></td>
                            <td>Random Forest Regressor</td>
                            <td>Predict completion rates</td>
                        </tr>
                        <tr>
                            <td><strong>⚙️ Optimizer</strong></td>
                            <td>Simulated Annealing</td>
                            <td>Find optimal allocation</td>
                        </tr>
                        <tr>
                            <td><strong>🔧 Backend</strong></td>
                            <td>FastAPI + Python</td>
                            <td>API & computation</td>
                        </tr>
                        <tr>
                            <td><strong>🎨 Frontend</strong></td>
                            <td>React + Vite</td>
                            <td>User interface</td>
                        </tr>
                        <tr>
                            <td><strong>📊 Features</strong></td>
                            <td>Pandas + NumPy</td>
                            <td>Feature engineering</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.08) 0%, rgba(118,75,162,0.08) 100%)', textAlign: 'center', border: '2px solid var(--primary)' }}>
                <h2>Ready to Optimize?</h2>
                <p style={{ marginTop: '15px', marginBottom: '25px', color: 'var(--text-muted)' }}>
                    Try the system with your production data and see the results!
                </p>
                <Link to="/input" className="btn" style={{ fontSize: '1.1rem', padding: '15px 40px' }}>
                    🚀 Start Optimization
                </Link>
            </div>
        </div>
    )
}

export default About
