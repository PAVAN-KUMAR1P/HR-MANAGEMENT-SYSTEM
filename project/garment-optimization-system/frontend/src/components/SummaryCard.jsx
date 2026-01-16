import React from 'react'

function SummaryCard({ title, before, after, value, format }) {
    const formatValue = (val, fmt) => {
        if (fmt === 'percent') {
            return `${(val * 100).toFixed(2)}%`
        } else if (fmt === 'pieces') {
            return `${Math.round(val)} pieces`
        } else if (fmt === 'percent-change') {
            return `+${val.toFixed(2)}%`
        } else if (fmt === 'pieces-gain') {
            return `+${Math.round(val)} pieces`
        }
        return val
    }

    if (value !== undefined) {
        return (
            <div className="summary-card">
                <h3>{title}</h3>
                <div className="value positive">{formatValue(value, format)}</div>
            </div>
        )
    }

    const delta = after - before
    const deltaClass = delta >= 0 ? 'positive' : 'negative'

    return (
        <div className="summary-card">
            <h3>{title}</h3>
            <div className="value">{formatValue(after, format)}</div>
            <div className={`delta ${deltaClass}`}>
                {delta >= 0 ? '▲' : '▼'} {formatValue(Math.abs(delta), format)} from {formatValue(before, format)}
            </div>
        </div>
    )
}

export default SummaryCard
