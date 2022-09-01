import { Route, DefaultGenerics } from '@tanstack/react-location'

import { HomePage } from '../pages/Home'
import Dashboard from '../features/dashboard'
import Account from '../features/account'
import Settings from '../features/settings'

export const routes: Route<DefaultGenerics>[] = [
    { path: '/', element: <HomePage /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/account', element: <Account /> },
    { path: '/settings', element: <Settings /> },
    { path: '/login', element: <HomePage /> },
]
