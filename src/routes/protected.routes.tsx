import { Route, DefaultGenerics } from '@tanstack/react-location'

import Dashboard from '../features/dashboard'
import Account from '../features/account'
import Settings from '../features/settings'
import Expenses from '../features/expenses'

export const routes: Route<DefaultGenerics>[] = [
    {
        path: '/',
        element: <Dashboard />,
        loader: () => Promise.resolve({ protected: true }),
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        loader: () => Promise.resolve({ protected: true }),
    },
    {
        path: '/account',
        element: <Account />,
        loader: () => Promise.resolve({ protected: true }),
    },
    {
        path: '/settings',
        element: <Settings />,
        loader: () => Promise.resolve({ protected: true }),
    },
    {
        path: '/expenses',
        element: <Expenses />,
        loader: () => Promise.resolve({ protected: true }),
    },
]
