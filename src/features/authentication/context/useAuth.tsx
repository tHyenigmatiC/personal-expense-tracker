import { AuthError, Session, User } from '@supabase/supabase-js'
import { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { supabase } from '../../../db/supabaseClient'

import { loginUser, registerUser } from '../services/api'

export interface IRegister {
    name: string
    email: string
    password: string
}

export interface ILogin {
    email: string
    password: string
}

interface IAuth {
    user: User | null
    session: Session | null
    login: (credentials: ILogin) => void
    register: (credentials: IRegister) => void
    error: AuthError | null
    isLoading: boolean
}

interface IChildren {
    children: ReactNode
}

const INITIAL_VALUE: IAuth = {
    user: null,
    session: null,
    login: () => undefined,
    register: () => undefined,
    error: null,
    isLoading: false,
}

const UserContext = createContext(INITIAL_VALUE)
UserContext.displayName = 'UserContext'

const AuthProvider = ({ children }: IChildren) => {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [error, setError] = useState<AuthError | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const login = (credentials: ILogin) => {
        setIsLoading(true)
        loginUser(credentials).then(response => {
            const {
                data: { user },
                error,
            } = response

            if (error) setError(error)
            setUser(user)
            setIsLoading(false)
        })
    }

    const register = (credentials: IRegister) => {
        setIsLoading(true)
        registerUser(credentials).then(response => {
            console.log(response)
            const {
                data: { user },
                error,
            } = response

            if (error) setError(error)
            setUser(user)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const value = {
        user,
        session,
        error,
        login,
        register,
        isLoading,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useAuth = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error('useAuth hook must be used within AuthProvider')
    }

    return context
}

export { UserContext, AuthProvider, useAuth }
