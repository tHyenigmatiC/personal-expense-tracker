import { Route, DefaultGenerics } from '@tanstack/react-location';
import { Dashboard } from '../features/dashboard/components/dashboard';

export const routes: Route<DefaultGenerics>[] = [
    { path: '/', element: <Dashboard /> },
    { path: '/dashboard', element: <Dashboard /> }
];
