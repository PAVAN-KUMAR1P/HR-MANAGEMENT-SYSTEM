import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeamForm from '../components/TeamForm'
import { optimizeTeams } from '../services/api'

function InputTeams({ setResult }) {
    const navigate = useNavigate()
    const [teams, setTeams] = useState([
        {
            total_workers: 120,
            cutting_workers: 40,
            sewing_workers: 50,
            finishing_workers: 30,
            cutting_attendance: 35,
            sewing_attendance: 25,
            finishing_attendance: 28,
            daily_target: 1000
        }
    ])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const addTeam = () => {
        setTeams([...teams, {
            total_workers: 100,
            cutting_workers: 30,
            sewing_workers: 40,
            finishing_workers: 30,
            cutting_attendance: 25,
            sewing_attendance: 35,
            finishing_attendance: 25,
            daily_target: 800
        }])
    }

    const removeTeam = (index) => {
        if (teams.length > 1) {
            setTeams(teams.filter((_, i) => i !== index))
        }
    }

    const updateTeam = (index, field, value) => {
        const newTeams = [...teams]
        newTeams[index][field] = parseInt(value) || 0
        setTeams(newTeams)
    }

    const handleSubmit = async () => {
        setError(null)
        setLoading(true)

        try {
            const result = await optimizeTeams(teams)
            setResult(result)
            navigate('/results')
        } catch (err) {
            setError(err.message || 'Optimization failed. Please check your inputs.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="header">
                <h1>Configure Production Teams</h1>
                <p>Enter team data to optimize worker allocation</p>
            </div>

            {error && (
                <div className="error">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div className="card">
                <h2>Teams ({teams.length})</h2>

                {teams.map((team, index) => (
                    <TeamForm
                        key={index}
                        team={team}
                        index={index}
                        updateTeam={updateTeam}
                        removeTeam={removeTeam}
                        canRemove={teams.length > 1}
                    />
                ))}

                <button className="btn btn-secondary" onClick={addTeam} style={{ marginTop: '15px' }}>
                    + Add Team
                </button>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
                <button
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ fontSize: '1.1rem', padding: '15px 40px' }}
                >
                    {loading ? 'Optimizing...' : 'Run Optimization'}
                </button>
            </div>

            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Running ML-powered optimization...</p>
                </div>
            )}
        </div>
    )
}

export default InputTeams
