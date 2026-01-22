import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path

    const navLinks = [
        { path: '/', label: '🏠 Home' },
        { path: '/input', label: '📝 Configure' },
        { path: '/results', label: '📊 Results' },
        { path: '/about', label: '📚 About' }
    ]

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    🏭 Garment Optimizer
                </Link>
                <ul className="navbar-links">
                    {navLinks.map(link => (
                        <li key={link.path}>
                            <Link 
                                to={link.path}
                                style={{
                                    color: isActive(link.path) ? '#8b9ef5' : 'white',
                                    textDecoration: isActive(link.path) ? 'underline' : 'none'
                                }}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
