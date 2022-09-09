import { AuthError, PostgrestError } from '@supabase/supabase-js'
import { useNavigate, UseNavigateType } from '@tanstack/react-location'
import {
    ChangeEvent,
    ChangeEventHandler,
    FocusEventHandler,
    FormEvent,
    FormEventHandler,
    useState,
} from 'react'
import { useAuth } from '../../context/useAuth'
import { Register } from './register.component'

interface IUser {
    email: string
    password: string
    name: string
}

export interface IRegisterProps {
    formState: IUser
    error: AuthError | PostgrestError | null
    success: boolean
    isLoading: boolean
    showError: boolean | null
    clearError: () => void
    navigate: UseNavigateType
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleRegister: (event: FormEvent<HTMLFormElement>) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleFocus: (event: any) => void
}

// This container contains all the logical implementation of the component
// It contains event handlers, api calls, state handling functions

const RegisterContainer = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        name: '',
    })
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const { error, register, isLoading, success, clearError } = useAuth()

    const navigate = useNavigate()

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleRegister: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        register(formState)
        setIsFocused(false)
    }

    const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
        setIsFocused(true)
    }

    const showError = !isFocused && error && !isLoading

    const props: IRegisterProps = {
        formState,
        error,
        success,
        isLoading,
        handleChange,
        handleRegister,
        handleFocus,
        showError,
        navigate,
        clearError,
    }
    return <Register {...props} />
}

export { RegisterContainer as Register }
