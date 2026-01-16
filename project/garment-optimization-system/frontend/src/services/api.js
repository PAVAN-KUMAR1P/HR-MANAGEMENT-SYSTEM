const API_BASE_URL = 'http://localhost:8000'

export async function optimizeTeams(teams) {
    const response = await fetch(`${API_BASE_URL}/optimize`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teams }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Optimization failed')
    }

    return response.json()
}

export async function checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.json()
}
