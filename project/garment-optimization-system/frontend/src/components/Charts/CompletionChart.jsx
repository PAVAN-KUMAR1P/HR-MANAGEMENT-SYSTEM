import React, { useState, useEffect } from 'react'

function CompletionChart({ initial, final }) {
    const initialRate = (initial.completion_rate * 100).toFixed(2)
    const finalRate = (final.completion_rate * 100).toFixed(2)
    const improvement = (finalRate - initialRate).toFixed(2)
    
    const [animatedInitial, setAnimatedInitial] = useState(0)
    const [animatedFinal, setAnimatedFinal] = useState(0)
    
    useEffect(() => {
        // Animate the circles
        const duration = 1500
        const steps = 60
        const initialStep = initialRate / steps
        const finalStep = finalRate / steps
        let currentStep = 0
        
        const interval = setInterval(() => {
            currentStep++
            setAnimatedInitial(Math.min(initialStep * currentStep, initialRate))
            setAnimatedFinal(Math.min(finalStep * currentStep, finalRate))
            
            if (currentStep >= steps) {
                clearInterval(interval)
            }
        }, duration / steps)
        
        return () => clearInterval(interval)
    }, [initialRate, finalRate])
    
    // SVG Circle parameters
    const size = 160
    const strokeWidth = 12
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    
    const CircularProgress = ({ value, color, gradientId, label, sublabel }) => {
        const offset = circumference - (value / 100) * circumference
        
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'fadeInUp 0.6s ease-out',
                animationFillMode: 'both'
            }}>
                <div style={{ position: 'relative', width: size, height: size }}>
                    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={color.start} />
                                <stop offset="100%" stopColor={color.end} />
                            </linearGradient>
                            <filter id={`shadow-${gradientId}`}>
                                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color.start} floodOpacity="0.3"/>
                            </filter>
                        </defs>
                        {/* Background circle */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="#e8eaf6"
                            strokeWidth={strokeWidth}
                        />
                        {/* Progress circle */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke={`url(#${gradientId})`}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{
                                transition: 'stroke-dashoffset 0.5s ease-out',
                                filter: `url(#shadow-${gradientId})`
                            }}
                        />
                    </svg>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            background: `linear-gradient(135deg, ${color.start} 0%, ${color.end} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            {value.toFixed(1)}%
                        </div>
                    </div>
                </div>
                <div style={{
                    marginTop: '15px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--text)',
                        marginBottom: '4px'
                    }}>
                        {label}
                    </div>
                    <div style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)'
                    }}>
                        {sublabel}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="card" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
            border: '1px solid #e8eaf6'
        }}>
            <h3 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '30px',
                fontSize: '1.4rem'
            }}>
                📊 Completion Rate Comparison
            </h3>

            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '30px',
                marginBottom: '30px'
            }}>
                <CircularProgress
                    value={animatedInitial}
                    color={{ start: '#ff6b6b', end: '#ee5a6f' }}
                    gradientId="beforeGradient"
                    label="Before"
                    sublabel="Initial State"
                />
                
                {/* Arrow indicator */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    animation: 'pulse 2s infinite'
                }}>
                    <div style={{
                        fontSize: '2.5rem',
                        color: improvement > 0 ? 'var(--success)' : improvement < 0 ? 'var(--danger)' : 'var(--text-muted)'
                    }}>
                        {improvement > 0 ? '→' : improvement < 0 ? '→' : '↔'}
                    </div>
                    <div style={{
                        marginTop: '8px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        background: improvement > 0 
                            ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)'
                            : improvement < 0 
                            ? 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)'
                            : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)',
                        color: improvement > 0 ? '#155724' : improvement < 0 ? '#721c24' : '#4a5568'
                    }}>
                        {improvement > 0 ? '+' : ''}{improvement}%
                    </div>
                </div>
                
                <CircularProgress
                    value={animatedFinal}
                    color={{ start: '#51cf66', end: '#37b24d' }}
                    gradientId="afterGradient"
                    label="After"
                    sublabel="Optimized"
                />
            </div>

            {/* Improvement Summary */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginTop: '20px'
            }}>
                <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '1px solid #feb2b2',
                    transition: 'transform 0.3s ease',
                    cursor: 'default'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '0.8rem', color: '#c53030', marginBottom: '5px', fontWeight: '500' }}>
                        Output Before
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#c53030' }}>
                        {initial.total_output.toLocaleString()}
                    </div>
                </div>
                
                <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '1px solid #9ae6b4',
                    transition: 'transform 0.3s ease',
                    cursor: 'default'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '0.8rem', color: '#276749', marginBottom: '5px', fontWeight: '500' }}>
                        Output After
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#276749' }}>
                        {final.total_output.toLocaleString()}
                    </div>
                </div>
                
                <div style={{
                    padding: '20px',
                    background: improvement > 0 
                        ? 'linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)'
                        : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: improvement > 0 ? '1px solid #81e6d9' : '1px solid #fcd34d',
                    transition: 'transform 0.3s ease',
                    cursor: 'default'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ 
                        fontSize: '0.8rem', 
                        color: improvement > 0 ? '#234e52' : '#92400e', 
                        marginBottom: '5px', 
                        fontWeight: '500' 
                    }}>
                        Improvement
                    </div>
                    <div style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700', 
                        color: improvement > 0 ? '#234e52' : '#92400e'
                    }}>
                        {improvement > 0 ? '+' : ''}{improvement}%
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

export default CompletionChart
