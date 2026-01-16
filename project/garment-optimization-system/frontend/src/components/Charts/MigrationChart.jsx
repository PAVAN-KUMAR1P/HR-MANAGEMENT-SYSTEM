import React from 'react'

function MigrationChart({ migration_log }) {
    const total = migration_log.cutting + migration_log.sewing + migration_log.finishing

    const departments = [
        { name: 'Cutting', count: migration_log.cutting, color: '#667eea' },
        { name: 'Sewing', count: migration_log.sewing, color: '#764ba2' },
        { name: 'Finishing', count: migration_log.finishing, color: '#f093fb' }
    ]

    const maxCount = Math.max(...departments.map(d => d.count))

    return (
        <div className="card">
            <h3>🔄 Worker Migrations by Department</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>
                Total migrations: <strong>{total}</strong>
            </p>

            <div style={{ marginTop: '25px' }}>
                {departments.map((dept, idx) => {
                    const percentage = maxCount > 0 ? (dept.count / maxCount) * 100 : 0

                    return (
                        <div key={idx} style={{ marginBottom: '25px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                                fontSize: '0.9rem'
                            }}>
                                <span><strong>{dept.name}</strong></span>
                                <span style={{ color: '#666' }}>{dept.count} migrations</span>
                            </div>

                            <div style={{
                                width: '100%',
                                height: '35px',
                                background: '#f0f0f0',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: `${percentage}%`,
                                    height: '100%',
                                    background: dept.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',
                                    color: 'white',
                                    fontWeight: '600',
                                    transition: 'width 0.8s ease',
                                    minWidth: dept.count > 0 ? '50px' : '0'
                                }}>
                                    {dept.count > 0 && dept.count}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div style={{
                marginTop: '20px',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: '#666'
            }}>
                💡 <strong>Note:</strong> Workers are migrated within the same department across different teams
                to balance workload and eliminate bottlenecks.
            </div>
        </div>
    )
}

export default MigrationChart
