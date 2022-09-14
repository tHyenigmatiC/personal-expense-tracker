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
// import {
//     addExpenses,
//     addMonthlyReport,
//     addCategoryType,
//     updateUserMetadata,
// } from './db/seeders/seed'

// set up react location instance
const location = new ReactLocation()

const App = () => {
    const firstLoad = useRef(true)
    useEffect(() => {
        if (firstLoad.current) {
            // addExpenses()
            // addMonthlyReport()
            // addCategoryType()
            // updateUserMetadata()
            firstLoad.current = false
        }

        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
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
