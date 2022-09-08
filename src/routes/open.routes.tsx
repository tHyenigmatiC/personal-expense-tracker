import { Route, DefaultGenerics } from '@tanstack/react-location'
import Loader from '../components/loader/loader.component'

import Login from '../features/authentication/login'
import Register from '../features/authentication/register'
import { PageNotFound } from '../pages/404'

export const routes: Route<DefaultGenerics>[] = [
    { path: '/login', element: <Login />, loader: () => ({ pageType: 'full' }) },
    { path: '/register', element: <Register />, loader: () => ({ pageType: 'full' }) },
    {
        path: '/*',
        element: <PageNotFound />,
        loader: () => ({ pageType: 'full' }),
        pendingElement: <Loader />,
    },
]
