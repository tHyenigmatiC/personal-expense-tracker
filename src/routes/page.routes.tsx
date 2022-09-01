import { Route, DefaultGenerics } from '@tanstack/react-location';

import { HomePage } from '../pages/Home';
import Dashboard from '../features/dashboard';
import Account from '../features/account';

export const routes: Route<DefaultGenerics>[] = [
    { path: '/', element: <HomePage /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/account', element: <Account /> },
    { path: '/login', element: <HomePage /> }
];
