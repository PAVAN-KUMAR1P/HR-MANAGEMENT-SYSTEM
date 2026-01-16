import React from 'react'

function TeamTable({ teams_before, teams_after }) {
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

    return (
        <div style={{ overflowX: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Metric</th>
                        <th>Before</th>
                        <th>After</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {teams_before.map((team_before, idx) => {
                        const team_after = teams_after[idx]

                        return (
                            <React.Fragment key={idx}>
                                <tr className={getDelta(team_before, team_after, 'cutting_attendance') !== '' ? 'highlight' : ''}>
                                    <td rowSpan="3"><strong>Team {idx + 1}</strong></td>
                                    <td>Cutting Attendance</td>
                                    <td>{team_before.cutting_attendance} / {team_before.cutting_workers}</td>
                                    <td>{team_after.cutting_attendance} / {team_after.cutting_workers}</td>
                                    <td className={getDeltaClass(team_before, team_after, 'cutting_attendance')}>
                                        {getDelta(team_before, team_after, 'cutting_attendance')}
                                    </td>
                                </tr>
                                <tr className={getDelta(team_before, team_after, 'sewing_attendance') !== '' ? 'highlight' : ''}>
                                    <td>Sewing Attendance</td>
                                    <td>{team_before.sewing_attendance} / {team_before.sewing_workers}</td>
                                    <td>{team_after.sewing_attendance} / {team_after.sewing_workers}</td>
                                    <td className={getDeltaClass(team_before, team_after, 'sewing_attendance')}>
                                        {getDelta(team_before, team_after, 'sewing_attendance')}
                                    </td>
                                </tr>
                                <tr className={getDelta(team_before, team_after, 'finishing_attendance') !== '' ? 'highlight' : ''}>
                                    <td>Finishing Attendance</td>
                                    <td>{team_before.finishing_attendance} / {team_before.finishing_workers}</td>
                                    <td>{team_after.finishing_attendance} / {team_after.finishing_workers}</td>
                                    <td className={getDeltaClass(team_before, team_after, 'finishing_attendance')}>
                                        {getDelta(team_before, team_after, 'finishing_attendance')}
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TeamTable
