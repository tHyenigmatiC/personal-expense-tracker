import { supabase } from '../../../db/supabaseClient'

import { ILogin, IRegister } from '../context/useAuth'

import { AuthResponse, PostgrestResponse } from '@supabase/supabase-js'

export const registerUser = async (
    credentials: IRegister,
): Promise<PostgrestResponse<undefined> | AuthResponse> => {
    const userExists = await doesUserExists(credentials.email)

    if (userExists) throw new Error('Account already exists')
    const { data, error } = await supabase.auth.signUp(credentials)

    if (error) throw error

    const updates = {
        id: data.user?.id,
        name: credentials.name,
        email: credentials.email,
        // eslint-disable-next-line camelcase
        updated_at: new Date(),
    }

    const response = await supabase.from('profiles').insert(updates)
    console.log(response)
    return response
}

export const loginUser = async (credentials: ILogin): Promise<AuthResponse> => {
    const response = await supabase.auth.signInWithPassword(credentials)
    console.log(response)
    return response
}

const doesUserExists = async (email: string) => {
    const { data, status, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .single()

    if (status === 406) return false
    if (data) return true
    if (error) throw error
    return false
}
