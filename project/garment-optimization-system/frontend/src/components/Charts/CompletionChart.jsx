import React from 'react'

function CompletionChart({ initial, final }) {
    const initialRate = (initial.completion_rate * 100).toFixed(2)
    const finalRate = (final.completion_rate * 100).toFixed(2)
    const improvement = (finalRate - initialRate).toFixed(2)

    return (
        <div className="card">
            <h3>📊 Completion Rate Comparison</h3>

            <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '30px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        fontSize: '0.9rem',
                        color: '#666'
                    }}>
                        <span><strong>Before Optimization</strong></span>
                        <span>{initialRate}%</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '40px',
                        background: '#e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${initialRate}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #ff6b6b 0%, #ee5a6f 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingRight: '10px',
                            color: 'white',
                            fontWeight: 'bold',
                            transition: 'width 1s ease'
                        }}>
                            {initialRate}%
                        </div>
                    </div>
                </div>

                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        fontSize: '0.9rem',
                        color: '#666'
                    }}>
                        <span><strong>After Optimization</strong></span>
                        <span>{finalRate}%</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '40px',
                        background: '#e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${finalRate}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #51cf66 0%, #37b24d 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingRight: '10px',
                            color: 'white',
                            fontWeight: 'bold',
                            transition: 'width 1s ease'
                        }}>
                            {finalRate}%
                        </div>
                    </div>
                </div>

                <div style={{
                    marginTop: '25px',
                    padding: '15px',
                    background: improvement > 0 ? '#d4edda' : '#f8d7da',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                        Improvement
                    </div>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: improvement > 0 ? '#28a745' : '#dc3545'
                    }}>
                        {improvement > 0 ? '+' : ''}{improvement}%
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompletionChart
