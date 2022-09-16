import { Outlet, Navigate, useRouter, RouteMatch, DefaultGenerics } from '@tanstack/react-location'

import Navigation from '../features/navigation'
import { useAuth } from '../features/authentication/context/useAuth'
import Loader from '../components/loader/loader.component'
import { Session } from '@supabase/supabase-js'
import { ExpenseInfo } from '../components/expense-info/expense-info.component'

interface IPageProps {
    matches: RouteMatch<DefaultGenerics>[]
    session?: Session | null
}

/* 
    I have used react-location as router package for this project.
    I have divided the routes into two files as protected.routes.tsx and 
    open.routes.tsx. You can see their explanation as below
    
    The logic for the routing is
        1. Each route is divided into two types auth routes and normal routes
        2. For every auth routes a prop is provided with flag `protected` as true
        3. For normal routes there is no such props provided
        4. Furthermore, each of auth or normal routes can be a full page component
            or can have multiple containers inside a page; such as side nav in left,
            center content container  and a container on the right.
        5. For full page component we do the same logic as above. We provide a prop
            with key `pageType` whose value is fullpage
        6. For pages with multiple containers, we don't proivde any such props

        How does the logic of auth page works?
            Every auth page first checks if there's session for the user or not. If there is session
            in the localstorage, then it forwards the routing to the specified destination route.
            But if the session doesn't exists then the routing is redirected to login page.
        
        How does the normal page logic works?
            For normal page we there are two logics to be handled. They are:
                1. We first check whether the page is login or register. If its any one of
                    them, then we check if the session exists. If it does we redirect the routing
                    to the '/' homepage.
                2. If the page is not the above mentioned pages, we simply forward the routing
                    without any modifications.
        
        The logic for handling the full page routes and routes consisting of multiple containers
        is simple. We just check the pageType flag and if it exists, we check whether its value if
        fullpage and thus rendering only the specified component. But if the page is composed of 
        containers then we add a sidenav, original component for the page and the right container
            
*/

export const Route = () => {
    const { session } = useAuth()
    const {
        state: { matches },
    } = useRouter()

    return matches[0] ? (
        matches[0]?.data.protected ? (
            <ProtectedRoute
                matches={matches}
                session={session}
            />
        ) : (
            <NormalRoute
                matches={matches}
                session={session}
            />
        )
    ) : (
        <Loader />
    )
}

const ProtectedRoute = ({ matches, session }: IPageProps) => {
    return session ? <FilteredPage matches={matches} /> : <Navigate to='/login' />
}

const NormalRoute = ({ matches, session }: IPageProps) => {
    // if there is session object available then we should not show the
    // '/login' and '/register' endpoint
    const redirectToDashboardWhenSessionExists =
        !!session &&
        matches[0] &&
        (matches[0].pathname === '/login' || matches[0].pathname === '/register')

    if (redirectToDashboardWhenSessionExists)
        return (
            <Navigate
                to='/'
                replace
                fromCurrent
            />
        )

    return <FilteredPage matches={matches} />
}

const FilteredPage = ({ matches }: IPageProps) => {
    return matches[0] ? (
        matches[0].data.pageType === 'full' ? (
            <Outlet />
        ) : (
            <div className='flex items-center justify-between h-screen min-h-screen'>
                <Navigation />
                <Outlet />
                <ExpenseInfo />
            </div>
        )
    ) : (
        <Loader />
    )
}
