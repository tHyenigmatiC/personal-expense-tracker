import { Route, DefaultGenerics } from '@tanstack/react-location'

import { HomePage } from '../pages/Home'
import Dashboard from '../features/dashboard'
import Account from '../features/account'
import Settings from '../features/settings'

export const routes: Route<DefaultGenerics>[] = [
    { path: '/', element: <Dashboard />, loader: () => ({ protected: true }) },
    { path: '/dashboard', element: <Dashboard />, loader: () => ({ protected: true }) },
    { path: '/account', element: <Account />, loader: () => ({ protected: true }) },
    { path: '/settings', element: <Settings />, loader: () => ({ protected: true }) },
]
