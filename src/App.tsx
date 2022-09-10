import React, { useEffect, useRef } from 'react'
import { ReactLocation, Router } from '@tanstack/react-location'
import { ReactLocationDevtools } from '@tanstack/react-location-devtools'

import { routes } from './routes/app.routes'

// auth provider
import { AuthProvider } from './features/authentication/context/useAuth'

// main routing component
import { Route } from './routes/routes.component'

import './App.css'

// seeders for initial data loading
import { addExpenses, addMonthlyReport, addCategoryType } from './db/seeders/seed'

// set up react location instance
const location = new ReactLocation()

const App = () => {
    const firstLoad = useRef(true)
    useEffect(() => {
        if (firstLoad.current) {
            // addExpenses()
            // addMonthlyReport()
            // addCategoryType()
            firstLoad.current = false
        }
    }, [])

    return (
        <AuthProvider>
            <Router
                location={location}
                routes={routes}
            >
                <Route />
                <ReactLocationDevtools initialIsOpen={false} />
            </Router>
        </AuthProvider>
    )
}

export default App
