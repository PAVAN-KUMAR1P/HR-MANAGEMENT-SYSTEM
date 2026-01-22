const API_BASE_URL = 'http://localhost:8000'

export async function optimizeTeams(teams, onProgress = null) {
    if (onProgress) {
        // Use streaming endpoint with progress updates
        return await optimizeTeamsWithProgress(teams, onProgress)
    }
    
    // Use regular endpoint
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

export async function optimizeTeamsWithProgress(teams, onProgress) {
    const response = await fetch(`${API_BASE_URL}/optimize-stream`, {
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

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
        const { done, value } = await reader.read()
        
        if (done) break
        
        buffer += decoder.decode(value, { stream: true })
        
        // Process complete messages
        const lines = buffer.split('\n')
        buffer = lines.pop() // Keep incomplete line in buffer
        
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = JSON.parse(line.slice(6))
                
                if (data.type === 'progress') {
                    onProgress(data.iteration, data.best_completion_rate)
                } else if (data.type === 'complete') {
                    return data.result
                } else if (data.type === 'error') {
                    throw new Error(data.message)
                }
            }
        }
    }
    
    throw new Error('Optimization stream ended unexpectedly')
}

export async function checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.json()
}

export async function loadSampleData(numTeams = 5) {
    const response = await fetch(`${API_BASE_URL}/sample-data?num_teams=${numTeams}`)
    
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to load sample data')
    }
    
    return response.json()
}

