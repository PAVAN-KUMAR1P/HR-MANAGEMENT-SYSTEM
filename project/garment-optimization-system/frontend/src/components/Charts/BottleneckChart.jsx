import React from 'react'

function BottleneckChart({ teams_before, teams_after }) {
    const calculateBottleneck = (team) => {
        const cuttingRatio = team.cutting_attendance / team.cutting_workers
        const sewingRatio = team.sewing_attendance / team.sewing_workers
        const finishingRatio = team.finishing_attendance / team.finishing_workers

        const minRatio = Math.min(cuttingRatio, sewingRatio, finishingRatio)
        const avgRatio = (cuttingRatio + sewingRatio + finishingRatio) / 3

        // Bottleneck severity: how far is min from average
        const severity = ((avgRatio - minRatio) / avgRatio) * 100

        return {
            severity: severity,
            bottleneck: minRatio === cuttingRatio ? 'Cutting' :
                minRatio === sewingRatio ? 'Sewing' : 'Finishing',
            ratios: { cuttingRatio, sewingRatio, finishingRatio }
        }
    }

    return (
        <div className="card">
            <h3>⚠️ Bottleneck Analysis</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>
                Comparing department balance before and after optimization
            </p>

            <div style={{ marginTop: '25px' }}>
                {teams_before.map((teamBefore, idx) => {
                    const teamAfter = teams_after[idx]
                    const beforeAnalysis = calculateBottleneck(teamBefore)
                    const afterAnalysis = calculateBottleneck(teamAfter)

                    return (
                        <div key={idx} style={{
                            marginBottom: '30px',
                            padding: '15px',
                            background: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            <h4 style={{ marginBottom: '15px' }}>Team {idx + 1}</h4>

                            {/* Before */}
                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
                                    <strong>Before:</strong> Bottleneck in <span style={{ color: '#dc3545' }}>{beforeAnalysis.bottleneck}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Cutting</div>
                                        <div style={{
                                            height: '8px',
                                            background: '#e0e0e0',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${beforeAnalysis.ratios.cuttingRatio * 100}%`,
                                                height: '100%',
                                                background: beforeAnalysis.bottleneck === 'Cutting' ? '#dc3545' : '#667eea',
                                                transition: 'width 0.5s ease'
                                            }}></div>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Sewing</div>
                                        <div style={{
                                            height: '8px',
                                            background: '#e0e0e0',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${beforeAnalysis.ratios.sewingRatio * 100}%`,
                                                height: '100%',
                                                background: beforeAnalysis.bottleneck === 'Sewing' ? '#dc3545' : '#667eea',
                                                transition: 'width 0.5s ease'
                                            }}></div>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Finishing</div>
                                        <div style={{
                                            height: '8px',
                                            background: '#e0e0e0',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${beforeAnalysis.ratios.finishingRatio * 100}%`,
                                                height: '100%',
                                                background: beforeAnalysis.bottleneck === 'Finishing' ? '#dc3545' : '#667eea',
                                                transition: 'width 0.5s ease'
                                            }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* After */}
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
                                    <strong>After:</strong> Bottleneck in <span style={{ color: afterAnalysis.severity < beforeAnalysis.severity ? '#28a745' : '#dc3545' }}>{afterAnalysis.bottleneck}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Cutting</div>
                                        <div style={{
                                            height: '8px',
                                            background: '#e0e0e0',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${afterAnalysis.ratios.cuttingRatio * 100}%`,
                                                height: '100%',
                                                background: afterAnalysis.bottleneck === 'Cutting' ? '#ffc107' : '#28a745',
                                                transition: 'width 0.5s ease'
                                            }}></div>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Sewing</div>
                                        <div style={{
                                            height: '8px',
                                            background: '#e0e0e0',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${afterAnalysis.ratios.sewingRatio * 100}%`,
                                                height: '100%',
                                                background: afterAnalysis.bottleneck === 'Sewing' ? '#ffc107' : '#28a745',
                                                transition: 'width 0.5s ease'
                                            }}></div>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Finishing</div>
                                        <div style={{
                                            height: '8px',
                                            background: '#e0e0e0',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${afterAnalysis.ratios.finishingRatio * 100}%`,
                                                height: '100%',
                                                background: afterAnalysis.bottleneck === 'Finishing' ? '#ffc107' : '#28a745',
                                                transition: 'width 0.5s ease'
                                            }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Improvement indicator */}
                            {afterAnalysis.severity < beforeAnalysis.severity && (
                                <div style={{
                                    marginTop: '10px',
                                    padding: '8px',
                                    background: '#d4edda',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem',
                                    color: '#155724'
                                }}>
                                    ✅ Bottleneck severity reduced by {(beforeAnalysis.severity - afterAnalysis.severity).toFixed(1)}%
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div style={{
                padding: '12px',
                background: '#fff3cd',
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: '#856404',
                border: '1px solid #ffc107'
            }}>
                🎯 <strong>Goal:</strong> Balance all three departments to minimize bottlenecks and maximize throughput
            </div>
        </div>
    )
}

export default BottleneckChart
