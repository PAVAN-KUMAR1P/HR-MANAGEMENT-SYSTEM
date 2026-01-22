import React from 'react'
import { Link } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard'
import TeamTable from '../components/TeamTable'
import CompletionChart from '../components/Charts/CompletionChart'
import MigrationChart from '../components/Charts/MigrationChart'
import BottleneckChart from '../components/Charts/BottleneckChart'

function Results({ result }) {
    if (!result) {
        return (
            <div className="container">
                <div className="card">
                    <h2>No results available</h2>
                    <p>Please run an optimization first.</p>
                    <Link to="/input" className="btn">Go to Input</Link>
                </div>
            </div>
        )
    }

    const { 
        initial, 
        final, 
        teams_before, 
        teams_after, 
        team_metrics_before = [],
        team_metrics_after = [],
        iterations, 
        migrations, 
        improvement_pct, 
        gain, 
        computation_time, 
        migration_log 
    } = result

    return (
        <div className="container">
            <div className="header">
                <h1>✅ Optimization Complete</h1>
                <p>Worker allocation has been optimized for maximum productivity</p>
            </div>

            <div className="summary-grid">
                <SummaryCard
                    title="Completion Rate"
                    before={initial.completion_rate}
                    after={final.completion_rate}
                    format="percent"
                />
                <SummaryCard
                    title="Total Output"
                    before={initial.total_output}
                    after={final.total_output}
                    format="pieces"
                />
                <SummaryCard
                    title="Overall Improvement"
                    value={improvement_pct}
                    format="percent-change"
                />
                <SummaryCard
                    title="Extra Production"
                    value={gain}
                    format="pieces-gain"
                />
            </div>

            <CompletionChart initial={initial} final={final} />

            <div className="charts-grid">
                <MigrationChart migration_log={migration_log} />
                <BottleneckChart teams_before={teams_before} teams_after={teams_after} />
            </div>

            <div className="card">
                <h3>📈 Optimization Metrics</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Iterations Run:</strong></td>
                            <td>{iterations}</td>
                        </tr>
                        <tr>
                            <td><strong>Successful Migrations:</strong></td>
                            <td>{migrations}</td>
                        </tr>
                        <tr>
                            <td><strong>Computation Time:</strong></td>
                            <td>{computation_time.toFixed(2)}s</td>
                        </tr>
                        <tr>
                            <td><strong>Cutting Migrations:</strong></td>
                            <td>{migration_log.cutting}</td>
                        </tr>
                        <tr>
                            <td><strong>Sewing Migrations:</strong></td>
                            <td>{migration_log.sewing}</td>
                        </tr>
                        <tr>
                            <td><strong>Finishing Migrations:</strong></td>
                            <td>{migration_log.finishing}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="card">
                <h3>👥 Team Comparison</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    View detailed before and after comparison for each team including performance metrics and attendance changes
                </p>
                <TeamTable 
                    teams_before={teams_before} 
                    teams_after={teams_after}
                    team_metrics_before={team_metrics_before}
                    team_metrics_after={team_metrics_after}
                />
            </div>

            <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%)' }}>
                <Link to="/input" className="btn">
                    ↺ Run Another Optimization
                </Link>
            </div>
        </div>
    )
}

export default Results
