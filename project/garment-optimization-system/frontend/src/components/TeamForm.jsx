import React from 'react'

function TeamForm({ team, index, updateTeam, removeTeam, canRemove }) {
    const fields = [
        { key: 'total_workers', label: 'Total Workers', icon: '👥', color: '#667eea' },
        { key: 'cutting_workers', label: 'Cutting', icon: '✂️', color: '#e74c3c' },
        { key: 'sewing_workers', label: 'Sewing', icon: '🧵', color: '#9b59b6' },
        { key: 'finishing_workers', label: 'Finishing', icon: '✨', color: '#2ecc71' },
        { key: 'cutting_attendance', label: 'Cut. Attendance', icon: '📋', color: '#e74c3c' },
        { key: 'sewing_attendance', label: 'Sew. Attendance', icon: '📋', color: '#9b59b6' },
        { key: 'finishing_attendance', label: 'Fin. Attendance', icon: '📋', color: '#2ecc71' },
        { key: 'daily_target', label: 'Daily Target', icon: '🎯', color: '#f39c12' }
    ]

    return (
        <div className="team-card-wrapper" style={{ 
            marginBottom: '25px',
            animation: 'fadeInUp 0.4s ease-out',
            animationFillMode: 'both',
            animationDelay: `${index * 0.1}s`
        }}>
            <div className="team-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                <h3 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '1.2rem',
                    color: 'var(--primary)',
                    fontWeight: '600'
                }}>
                    <span style={{
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                        color: 'white',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                    }}>
                        {index + 1}
                    </span>
                    Team {index + 1}
                </h3>
                {canRemove && (
                    <button 
                        className="remove-btn" 
                        onClick={() => removeTeam(index)}
                        style={{
                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'scale(1.05)'
                            e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.4)'
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'scale(1)'
                            e.target.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.3)'
                        }}
                    >
                        ✕ Remove
                    </button>
                )}
            </div>

            <div className="team-form" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '15px',
                padding: '20px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
                border: '2px solid #e8eaf6',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.08)'
            }}>
                {fields.map((field, fieldIndex) => (
                    <div 
                        key={field.key} 
                        className="form-group"
                        style={{
                            position: 'relative',
                            animation: 'fadeIn 0.3s ease-out',
                            animationFillMode: 'both',
                            animationDelay: `${fieldIndex * 0.05}s`
                        }}
                    >
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: 'var(--text)',
                            fontSize: '0.85rem'
                        }}>
                            <span style={{ fontSize: '1rem' }}>{field.icon}</span>
                            {field.label}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="number"
                                value={team[field.key]}
                                onChange={(e) => updateTeam(index, field.key, e.target.value)}
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    border: '2px solid #e8eaf6',
                                    borderRadius: '10px',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    background: 'white',
                                    color: 'var(--text)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = field.color
                                    e.target.style.boxShadow = `0 0 0 3px ${field.color}20`
                                    e.target.style.background = '#fafbff'
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e8eaf6'
                                    e.target.style.boxShadow = 'none'
                                    e.target.style.background = 'white'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '-2px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '0',
                                height: '2px',
                                background: field.color,
                                borderRadius: '2px',
                                transition: 'width 0.3s ease'
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamForm
