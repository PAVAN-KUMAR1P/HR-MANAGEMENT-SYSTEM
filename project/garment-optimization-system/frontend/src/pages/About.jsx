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
                <p style={{ marginTop: '15px', lineHeight: '1.8' }}>
                    In garment manufacturing, production flows sequentially through three departments:
                    <strong> Cutting → Sewing → Finishing</strong>. When one department has low attendance
                    while others are fully staffed, it creates a <strong>bottleneck</strong> that limits
                    overall output.
                </p>
                <p style={{ marginTop: '15px', lineHeight: '1.8' }}>
                    This system intelligently reallocates workers from over-staffed departments to
                    bottleneck departments, maximizing total production output.
                </p>
            </div>

            <div className="card">
                <h2>🔬 The Bottleneck Theory</h2>
                <h3 style={{ marginTop: '20px', color: '#667eea' }}>Sequential Production Flow</h3>
                <p style={{ marginTop: '10px', lineHeight: '1.8' }}>
                    Garment production is <strong>sequential</strong>, not parallel:
                </p>
                <div style={{
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '15px',
                    fontFamily: 'monospace'
                }}>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Step 1:</strong> Cutting Department cuts fabric
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Step 2:</strong> Sewing Department assembles garments
                    </div>
                    <div>
                        <strong>Step 3:</strong> Finishing Department completes final touches
                    </div>
                </div>

                <h3 style={{ marginTop: '25px', color: '#667eea' }}>The Bottleneck Effect</h3>
                <p style={{ marginTop: '10px', lineHeight: '1.8' }}>
                    <strong>Key Principle:</strong> Final output = min(Cutting, Sewing, Finishing)
                </p>
                <div style={{
                    background: '#fff3cd',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '15px',
                    border: '2px solid #ffc107'
                }}>
                    <strong>Example:</strong><br />
                    • Cutting: 100 pieces/day<br />
                    • Sewing: 50 pieces/day ⚠️ (BOTTLENECK)<br />
                    • Finishing: 120 pieces/day<br />
                    <br />
                    <strong>Result:</strong> Only 50 pieces/day total (limited by sewing)
                </div>
            </div>

            <div className="card">
                <h2>🤖 How Machine Learning Helps</h2>
                <h3 style={{ marginTop: '20px', color: '#667eea' }}>Random Forest Model</h3>
                <p style={{ marginTop: '10px', lineHeight: '1.8' }}>
                    Our ML model predicts team completion rates based on:
                </p>
                <ul style={{ marginTop: '10px', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li><strong>Worker allocation</strong> (cutting, sewing, finishing)</li>
                    <li><strong>Attendance ratios</strong> (actual vs capacity)</li>
                    <li><strong>Capacity pressure</strong> (target per worker)</li>
                    <li><strong>Historical performance</strong> patterns</li>
                </ul>

                <h3 style={{ marginTop: '25px', color: '#667eea' }}>Feature Engineering</h3>
                <p style={{ marginTop: '10px', lineHeight: '1.8' }}>
                    The model uses <strong>20+ engineered features</strong> including:
                </p>
                <div style={{
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '15px'
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
                <h3 style={{ marginTop: '20px', color: '#667eea' }}>Simulated Annealing</h3>
                <p style={{ marginTop: '10px', lineHeight: '1.8' }}>
                    We use <strong>Simulated Annealing</strong>, a probabilistic optimization technique
                    inspired by metallurgy:
                </p>

                <div style={{ marginTop: '20px' }}>
                    <h4 style={{ color: '#333' }}>How It Works:</h4>
                    <ol style={{ marginTop: '10px', lineHeight: '1.8', paddingLeft: '20px' }}>
                        <li><strong>Start</strong> with current team configuration</li>
                        <li><strong>Randomly migrate</strong> one worker between teams</li>
                        <li><strong>Evaluate</strong> new configuration with ML model</li>
                        <li><strong>Accept or reject</strong> based on improvement</li>
                        <li><strong>Cool down</strong> temperature (reduce randomness)</li>
                        <li><strong>Repeat</strong> until convergence</li>
                    </ol>
                </div>

                <h3 style={{ marginTop: '25px', color: '#667eea' }}>Migration Rules</h3>
                <div style={{
                    background: '#e7f3ff',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '15px',
                    border: '2px solid #2196f3'
                }}>
                    ✅ <strong>Allowed:</strong><br />
                    • Move workers within same department (cutting to cutting)<br />
                    • Respect department capacity limits<br />
                    • Maintain minimum attendance (≥1 per department)<br />
                    <br />
                    ❌ <strong>Not Allowed:</strong><br />
                    • Cross-department moves (cutting to sewing)<br />
                    • Exceed worker capacity<br />
                    • Leave department empty
                </div>
            </div>

            <div className="card">
                <h2>📊 Why This Approach Works</h2>
                <div style={{ marginTop: '15px' }}>
                    <h3 style={{ color: '#28a745' }}>✅ Advantages</h3>
                    <ul style={{ marginTop: '10px', lineHeight: '1.8', paddingLeft: '20px' }}>
                        <li><strong>Data-Driven:</strong> Uses actual historical performance</li>
                        <li><strong>Bottleneck-Aware:</strong> Respects sequential workflow</li>
                        <li><strong>Constraint-Respecting:</strong> Follows real-world rules</li>
                        <li><strong>Scalable:</strong> Works with any number of teams</li>
                        <li><strong>Fast:</strong> Converges in seconds</li>
                    </ul>
                </div>

                <div style={{ marginTop: '25px' }}>
                    <h3 style={{ color: '#667eea' }}>🎯 Expected Results</h3>
                    <ul style={{ marginTop: '10px', lineHeight: '1.8', paddingLeft: '20px' }}>
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
                            <td><strong>ML Model</strong></td>
                            <td>Random Forest Regressor</td>
                            <td>Predict completion rates</td>
                        </tr>
                        <tr>
                            <td><strong>Optimizer</strong></td>
                            <td>Simulated Annealing</td>
                            <td>Find optimal allocation</td>
                        </tr>
                        <tr>
                            <td><strong>Backend</strong></td>
                            <td>FastAPI + Python</td>
                            <td>API & computation</td>
                        </tr>
                        <tr>
                            <td><strong>Frontend</strong></td>
                            <td>React + Vite</td>
                            <td>User interface</td>
                        </tr>
                        <tr>
                            <td><strong>Features</strong></td>
                            <td>Pandas + NumPy</td>
                            <td>Feature engineering</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
                <h2>Ready to Optimize?</h2>
                <p style={{ marginTop: '15px', marginBottom: '25px' }}>
                    Try the system with your production data and see the results!
                </p>
                <Link to="/input" className="btn" style={{ fontSize: '1.1rem', padding: '15px 40px' }}>
                    Start Optimization →
                </Link>
            </div>
        </div>
    )
}

export default About
