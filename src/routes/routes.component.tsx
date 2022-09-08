import { Outlet, Navigate, useRouter } from '@tanstack/react-location'

import Navigation from '../features/navigation'
import Charts from '../features/charts'
import { useAuth } from '../features/authentication/context/useAuth'
import { Session } from '@supabase/supabase-js'

interface ISession {
    session: Session | null
}

export const Route = () => {
    const { session } = useAuth()
    const {
        state: { matches },
    } = useRouter()

    return matches[0]?.data.protected ? <ProtectedRoute session={session} /> : <FullPageRoute />
}

const ProtectedRoute = ({ session }: ISession) => {
    return session ? (
        <>
            <Navigation />
            <Outlet />
            <Charts />
        </>
    ) : (
        <Navigate to='/login' />
    )
}

const FullPageRoute = () => <Outlet />
