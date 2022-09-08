import { Route, DefaultGenerics } from '@tanstack/react-location'

import Login from '../features/authentication/login'
import Register from '../features/authentication/register'

export const routes: Route<DefaultGenerics>[] = [
    { path: '/login', element: <Login />, loader: () => ({ pageType: 'full' }) },
    { path: '/register', element: <Register />, loader: () => ({ pageType: 'full' }) },
]
