import React from 'react';
import { ReactLocation, Router, Outlet } from '@tanstack/react-location';

import { routes } from './routes/page.routes';

import './App.css';

import Navigation from './features/navigation';
import FooterNav from './features/footernav';

// set up react location instance
const location = new ReactLocation();

const App = () => {
    return (
        <Router
            location={location}
            routes={routes}>
            <Navigation />
            <Outlet />
            <FooterNav />
        </Router>
    );
};

export default App;
