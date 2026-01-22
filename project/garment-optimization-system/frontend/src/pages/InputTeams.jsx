import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeamForm from '../components/TeamForm'
import ProgressBox from '../components/ProgressBox'
import { optimizeTeams, loadSampleData } from '../services/api'

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
    const [loadingDataset, setLoadingDataset] = useState(false)
    const [numTeamsToLoad, setNumTeamsToLoad] = useState(5)
    const [showDatasetPanel, setShowDatasetPanel] = useState(false)
    const [progress, setProgress] = useState({ iteration: 0, bestCompletionRate: 0 })

    const handleLoadDataset = async () => {
        setError(null)
        setLoadingDataset(true)
        try {
            const data = await loadSampleData(numTeamsToLoad)
            setTeams(data.teams)
        } catch (err) {
            setError(err.message || 'Failed to load sample data')
        } finally {
            setLoadingDataset(false)
        }
    }

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
        setProgress({ iteration: 0, bestCompletionRate: 0 })

        try {
            const result = await optimizeTeams(teams, (iteration, bestCompletionRate) => {
                setProgress({ iteration, bestCompletionRate })
            })
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
            <div className="header" style={{ position: 'relative' }}>
                <h1>⚙️ Configure Production Teams</h1>
                <p>Enter team data to optimize worker allocation</p>
                <button
                    onClick={() => setShowDatasetPanel(!showDatasetPanel)}
                    title="Load sample data from dataset"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: showDatasetPanel ? 'var(--primary)' : 'linear-gradient(135deg, #e8f4f8 0%, #d4edda 100%)',
                        color: showDatasetPanel ? 'white' : 'var(--text)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '45px',
                        height: '45px',
                        fontSize: '1.3rem',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    📂
                </button>
            </div>

            {error && (
                <div className="error">
                    <strong>❌ Error:</strong> {error}
                </div>
            )}

            {showDatasetPanel && (
            <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4edda 100%)' }}>
                <h2>📂 Load Sample Data</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>
                    Load random teams from the dataset
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="numTeams" style={{ fontWeight: '500' }}>Number of teams:</label>
                        <input
                            type="number"
                            id="numTeams"
                            min="1"
                            max="50"
                            value={numTeamsToLoad}
                            onChange={(e) => setNumTeamsToLoad(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                            style={{ width: '80px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleLoadDataset}
                        disabled={loadingDataset}
                        style={{ padding: '10px 25px' }}
                    >
                        {loadingDataset ? '⏳ Loading...' : '📊 Load Random Data'}
                    </button>
                </div>
            </div>
            )}

            <div className="card">
                <h2>Teams ({teams.length})</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
                    Configure your production teams below. Enter worker counts, attendance, and daily targets for each team.
                </p>

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

                <button className="btn btn-secondary" onClick={addTeam} style={{ marginTop: '20px' }}>
                    + Add Another Team
                </button>
            </div>

            <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%)' }}>
                <button
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ fontSize: '1.1rem', padding: '15px 50px' }}
                >
                    {loading ? (
                        <>
                            <span className="spinner" style={{ width: '20px', height: '20px', margin: '0 8px 0 0', display: 'inline-block', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white' }}></span>
                            Optimizing...
                        </>
                    ) : (
                        '🚀 Run Optimization'
                    )}
                </button>
            </div>

            {loading && (
                <ProgressBox 
                    iteration={progress.iteration} 
                    bestCompletionRate={progress.bestCompletionRate}
                />
            )}
        </div>
    )
}

export default InputTeams
