import { supabase } from '../../../db/supabaseClient'

/* eslint-disable camelcase */
interface IUser {
    name?: string
    password?: string
}

export const updateUser = async (query: IUser) => {
    const response = await supabase.auth.updateUser({ data: query })
    return response
}

export const updatePassword = async (query: IUser) => {
    const response = await supabase.auth.updateUser(query)
    return response
}
