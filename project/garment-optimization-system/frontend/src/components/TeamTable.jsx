import React from 'react'

function TeamTable({ teams_before, teams_after, team_metrics_before = [], team_metrics_after = [] }) {
    const getDelta = (before, after, key) => {
        const delta = after[key] - before[key]
        if (delta === 0) return ''
        return delta > 0 ? `+${delta}` : `${delta}`
    }

    const getDeltaClass = (before, after, key) => {
        const delta = after[key] - before[key]
        if (delta === 0) return ''
        return delta > 0 ? 'positive' : 'negative'
    }

    const formatPercent = (value) => {
        return (value * 100).toFixed(2) + '%'
    }

    const formatNumber = (value) => {
        return Math.round(value).toLocaleString()
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <style>{`
                .team-table-wrapper {
                    display: grid;
                    gap: 20px;
                }
                
                .team-card {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                }
                
                .team-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                }
                
                .team-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #dee2e6;
                }
                
                .team-title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: var(--primary);
                }
                
                .performance-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 12px;
                    margin-bottom: 15px;
                }
                
                .performance-item {
                    background: white;
                    padding: 12px;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                }
                
                .performance-label {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    margin-bottom: 5px;
                }
                
                .performance-value {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .value-before {
                    color: #6c757d;
                    text-decoration: line-through;
                    font-size: 0.9rem;
                }
                
                .value-after {
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: var(--primary);
                }
                
                .arrow {
                    color: #28a745;
                    font-size: 1.2rem;
                }
                
                .attendance-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                .attendance-table th {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 10px;
                    text-align: left;
                    font-size: 0.9rem;
                }
                
                .attendance-table td {
                    padding: 10px;
                    border-bottom: 1px solid #e9ecef;
                }
                
                .attendance-table tr:last-child td {
                    border-bottom: none;
                }
                
                .attendance-table .highlight {
                    background-color: #fff3cd;
                }
                
                .change-badge {
                    display: inline-block;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    font-weight: bold;
                }
                
                .change-badge.positive {
                    background-color: #d4edda;
                    color: #155724;
                }
                
                .change-badge.negative {
                    background-color: #f8d7da;
                    color: #721c24;
                }
            `}</style>
            
            <div className="team-table-wrapper">
                {teams_before.map((team_before, idx) => {
                    const team_after = teams_after[idx]
                    const metrics_before = team_metrics_before[idx] || { completion_rate: 0, output: 0, target: team_before.daily_target }
                    const metrics_after = team_metrics_after[idx] || { completion_rate: 0, output: 0, target: team_after.daily_target }
                    
                    const hasChanges = 
                        team_before.cutting_attendance !== team_after.cutting_attendance ||
                        team_before.sewing_attendance !== team_after.sewing_attendance ||
                        team_before.finishing_attendance !== team_after.finishing_attendance

                    return (
                        <div key={idx} className="team-card">
                            <div className="team-header">
                                <div className="team-title">👥 Team {idx + 1}</div>
                                {hasChanges && <span style={{ color: '#28a745', fontWeight: 'bold' }}>✨ Optimized</span>}
                            </div>
                            
                            <div className="performance-grid">
                                <div className="performance-item">
                                    <div className="performance-label">Output (pieces)</div>
                                    <div className="performance-value">
                                        <span className="value-before">{formatNumber(metrics_before.output)}</span>
                                        <span className="arrow">→</span>
                                        <span className="value-after">{formatNumber(metrics_after.output)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <table className="attendance-table">
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        <th>Before</th>
                                        <th>After</th>
                                        <th>Change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={getDelta(team_before, team_after, 'cutting_attendance') !== '' ? 'highlight' : ''}>
                                        <td><strong>Cutting</strong></td>
                                        <td>{team_before.cutting_attendance} / {team_before.cutting_workers}</td>
                                        <td>{team_after.cutting_attendance} / {team_after.cutting_workers}</td>
                                        <td>
                                            {getDelta(team_before, team_after, 'cutting_attendance') && (
                                                <span className={`change-badge ${getDeltaClass(team_before, team_after, 'cutting_attendance')}`}>
                                                    {getDelta(team_before, team_after, 'cutting_attendance')}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className={getDelta(team_before, team_after, 'sewing_attendance') !== '' ? 'highlight' : ''}>
                                        <td><strong>Sewing</strong></td>
                                        <td>{team_before.sewing_attendance} / {team_before.sewing_workers}</td>
                                        <td>{team_after.sewing_attendance} / {team_after.sewing_workers}</td>
                                        <td>
                                            {getDelta(team_before, team_after, 'sewing_attendance') && (
                                                <span className={`change-badge ${getDeltaClass(team_before, team_after, 'sewing_attendance')}`}>
                                                    {getDelta(team_before, team_after, 'sewing_attendance')}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className={getDelta(team_before, team_after, 'finishing_attendance') !== '' ? 'highlight' : ''}>
                                        <td><strong>Finishing</strong></td>
                                        <td>{team_before.finishing_attendance} / {team_before.finishing_workers}</td>
                                        <td>{team_after.finishing_attendance} / {team_after.finishing_workers}</td>
                                        <td>
                                            {getDelta(team_before, team_after, 'finishing_attendance') && (
                                                <span className={`change-badge ${getDeltaClass(team_before, team_after, 'finishing_attendance')}`}>
                                                    {getDelta(team_before, team_after, 'finishing_attendance')}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TeamTable
