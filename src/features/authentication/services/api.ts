import { supabase } from '../../../db/supabaseClient'

import { ILogin, IRegister } from '../context/useAuth'

import { AuthResponse } from '@supabase/supabase-js'

export const registerUser = async (credentials: IRegister): Promise<AuthResponse> => {
    const response = await supabase.auth.signUp(credentials)
    return response
}

export const loginUser = async (credentials: ILogin): Promise<AuthResponse> => {
    const response = await supabase.auth.signInWithPassword(credentials)
    return response
}
