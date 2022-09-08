import { Outlet, Navigate, useRouter, RouteMatch, DefaultGenerics } from '@tanstack/react-location'

import Navigation from '../features/navigation'
import Charts from '../features/charts'
import { useAuth } from '../features/authentication/context/useAuth'
import { Session } from '@supabase/supabase-js'
import Loader from '../components/loader/loader.component'

interface ISession {
    session: Session | null
}

interface IMatches {
    matches: RouteMatch<DefaultGenerics>[]
}

export const Route = () => {
    const {
        state: { matches },
    } = useRouter()

    return matches[0]?.data.protected ? (
        <ProtectedRoute matches={matches} />
    ) : (
        <FilteredPage matches={matches} />
    )
}

const ProtectedRoute = ({ matches }: IMatches) => {
    const { session } = useAuth()
    return session ? <FilteredPage matches={matches} /> : <Navigate to='/login' />
}

const FilteredPage = ({ matches }: IMatches) => {
    return matches[0] ? (
        matches[0].data.pageType === 'full' ? (
            <Outlet />
        ) : (
            <>
                <Navigation />
                <Outlet />
                <Charts />
            </>
        )
    ) : (
        <Loader />
    )
}
