import React from 'react'

function ProgressBox({ iteration, bestCompletionRate }) {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '30px 40px',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            zIndex: 10000,
            minWidth: '320px',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease-in'
        }}>
            <div style={{ marginBottom: '20px' }}>
                <div className="spinner" style={{
                    width: '50px',
                    height: '50px',
                    margin: '0 auto 15px',
                    border: '4px solid rgba(255,255,255,0.3)',
                    borderTop: '4px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem' }}>🚀 Optimizing...</h3>
            </div>
            
            <div style={{
                background: 'rgba(255,255,255,0.15)',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '10px'
            }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '5px' }}>
                    Current Iteration
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {iteration}
                </div>
            </div>
            
            <div style={{
                background: 'rgba(255,255,255,0.15)',
                padding: '15px',
                borderRadius: '10px'
            }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '5px' }}>
                    Best Completion Rate
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {(bestCompletionRate * 100).toFixed(2)}%
                </div>
            </div>
            
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -45%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }
            `}</style>
        </div>
    )
}

export default ProgressBox
