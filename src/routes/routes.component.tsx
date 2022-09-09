import { Outlet, Navigate, useRouter, RouteMatch, DefaultGenerics } from '@tanstack/react-location'

import Navigation from '../features/navigation'
import Charts from '../features/charts'
import { useAuth } from '../features/authentication/context/useAuth'
import Loader from '../components/loader/loader.component'
import { Session } from '@supabase/supabase-js'

interface IPageProps {
    matches: RouteMatch<DefaultGenerics>[]
    session?: Session | null
}

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
    const redirect =
        !!session &&
        matches[0] &&
        (matches[0].pathname === '/login' || matches[0].pathname === '/register')

    if (redirect) return <Navigate to='/' />

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
                <Charts />
            </div>
        )
    ) : (
        <Loader />
    )
}
