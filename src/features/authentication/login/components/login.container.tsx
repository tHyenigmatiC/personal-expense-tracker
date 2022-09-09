import { AuthError, PostgrestError } from '@supabase/supabase-js'
import { useNavigate, UseNavigateType } from '@tanstack/react-location'
import {
    useState,
    ChangeEventHandler,
    FormEventHandler,
    FocusEventHandler,
    ChangeEvent,
    FormEvent,
} from 'react'
import { useAuth } from '../../context/useAuth'
import { Login } from './login.component'

interface IUser {
    email: string
    password: string
}

export interface ILoginProps {
    formState: IUser
    error: AuthError | PostgrestError | null
    success: boolean
    isLoading: boolean
    showError: boolean | null
    clearError: () => void
    navigate: UseNavigateType
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleLogin: (event: FormEvent<HTMLFormElement>) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleFocus: (event: any) => void
}

const LoginContainer = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    })
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const { error, login, isLoading, success, clearError } = useAuth()

    const navigate = useNavigate()

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleLogin: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        login(formState)
        setIsFocused(false)
    }

    const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
        setIsFocused(true)
    }

    const showError = !isFocused && error && !isLoading

    const props: ILoginProps = {
        formState,
        error,
        success,
        isLoading,
        showError,
        clearError,
        navigate,
        handleChange,
        handleLogin,
        handleFocus,
    }
    return <Login {...props} />
}

export { LoginContainer as Login }
