import React from 'react'
import { ReactLocation, Router, Outlet } from '@tanstack/react-location'

import { routes } from './routes/page.routes'

import './App.css'

import Navigation from './features/navigation'
import Calendar from './features/calendar'

// set up react location instance
const location = new ReactLocation()

const App = () => {
    return (
        <Router
            location={location}
            routes={routes}
        >
            <div className='flex items-center justify-between h-screen min-h-screen'>
                <Navigation />
                <Outlet />
                <Calendar />
            </div>
        </Router>
    )
}

export default App
