import { supabase } from '../../../db/supabaseClient'

import { ILogin, IRegister } from '../context/useAuth'

import { AuthResponse, PostgrestResponse } from '@supabase/supabase-js'

export const registerUser = async (
    credentials: IRegister,
): Promise<PostgrestResponse<undefined> | AuthResponse> => {
    const userExists = await doesUserExists(credentials.email)

    if (userExists) throw new Error('Account already exists')

    const { name, ...otherCredentials } = credentials

    const response = await supabase.auth.signUp({
        ...otherCredentials,
        options: { data: { name } },
    })

    const { error } = response
    if (error) throw error
    return response
}

export const loginUser = async (credentials: ILogin): Promise<AuthResponse> => {
    const response = await supabase.auth.signInWithPassword(credentials)
    return response
}

const doesUserExists = async (email: string) => {
    try {
        const { data, status, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('email', email)

        console.log({ data, status, error })
        if (error) throw error
        if (data?.length) return true
        else return false
    } catch (error) {
        console.log(error)
        return false
    }
}
