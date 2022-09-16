import { AuthError, PostgrestError, Session } from '@supabase/supabase-js'
import { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { supabase } from '../../../db/supabaseClient'

import { loginUser, registerUser } from '../services/api'

export interface IRegister extends ILogin {
    name: string
}

export interface ILogin {
    email: string
    password: string
}

interface IAuth {
    session: Session | null
    login: (credentials: ILogin) => void
    register: (credentials: IRegister) => void
    error: AuthError | PostgrestError | null
    clearError: () => void
    success: boolean
    isLoading: boolean
}

interface IChildren {
    children: ReactNode
}

const INITIAL_VALUE: IAuth = {
    session: null,
    login: () => undefined,
    register: () => undefined,
    error: null,
    clearError: () => undefined,
    isLoading: false,
    success: false,
}

const UserContext = createContext(INITIAL_VALUE)
UserContext.displayName = 'UserContext'

const AuthProvider = ({ children }: IChildren) => {
    const [session, setSession] = useState<Session | null>(null)
    const [error, setError] = useState<AuthError | PostgrestError | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    // calls supabase's signin function
    const login = (credentials: ILogin) => {
        setIsLoading(true)
        loginUser(credentials).then(response => {
            const { error } = response

            if (error) setError(error)
            setIsLoading(false)
        })
    }

    // calls supabase's signup function to register the user
    // also I have written a database function in supabase which gets triggered
    // after the user is registered in auth table.
    // The function inserts the user data in a new profile table where we will be
    // storing the additional info for the user
    const register = (credentials: IRegister) => {
        setIsLoading(true)
        registerUser(credentials)
            .then(response => {
                const { error } = response

                if (error) {
                    setError(error)
                } else {
                    setSuccess(true)
                    setError(null)
                }
                setIsLoading(false)
            })
            .catch(error => {
                setError(error)
                setIsLoading(false)
            })
    }

    const clearError = () => {
        setError(null)
    }

    // This useEffect hook is responsible for restoring the user's logged in
    // status in the following conditions:
    // 1. When user logs in via login form
    // 2. When the user is already logged in, redirect the user to dashboard
    // 3. When the user logs out, redirect the user to /login page
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const value = {
        session,
        error,
        clearError,
        login,
        register,
        isLoading,
        success,
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
