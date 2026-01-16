import React from 'react'

function TeamForm({ team, index, updateTeam, removeTeam, canRemove }) {
    const fields = [
        { key: 'total_workers', label: 'Total Workers' },
        { key: 'cutting_workers', label: 'Cutting Workers' },
        { key: 'sewing_workers', label: 'Sewing Workers' },
        { key: 'finishing_workers', label: 'Finishing Workers' },
        { key: 'cutting_attendance', label: 'Cutting Attendance' },
        { key: 'sewing_attendance', label: 'Sewing Attendance' },
        { key: 'finishing_attendance', label: 'Finishing Attendance' },
        { key: 'daily_target', label: 'Daily Target' }
    ]

    return (
        <div style={{ marginBottom: '20px' }}>
            <div className="team-header">
                <h3>Team {index + 1}</h3>
                {canRemove && (
                    <button className="remove-btn" onClick={() => removeTeam(index)}>
                        Remove Team
                    </button>
                )}
            </div>

            <div className="team-form">
                {fields.map(field => (
                    <div key={field.key} className="form-group">
                        <label>{field.label}</label>
                        <input
                            type="number"
                            value={team[field.key]}
                            onChange={(e) => updateTeam(index, field.key, e.target.value)}
                            min="0"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamForm
