import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import InputTeams from './pages/InputTeams'
import Results from './pages/Results'
import About from './pages/About'

function App() {
    const [optimizationResult, setOptimizationResult] = useState(null)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/input"
                    element={<InputTeams setResult={setOptimizationResult} />}
                />
                <Route
                    path="/results"
                    element={<Results result={optimizationResult} />}
                />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    )
}

export default App
