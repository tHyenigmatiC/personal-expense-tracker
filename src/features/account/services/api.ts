import { supabase } from '../../../db/supabaseClient'

/* eslint-disable camelcase */
interface IUser {
    name?: string
    password?: string
}

interface IExpenseDateRangeQuery {
    startDate: string
    endDate: string
    user_id: string
}

export const updateUser = async (query: IUser) => {
    const response = await supabase.auth.updateUser({ data: query })
    return response
}

export const updatePassword = async (query: IUser) => {
    const response = await supabase.auth.updateUser(query)
    return response
}

export const getExpensesBetween = async (query: IExpenseDateRangeQuery) => {
    const { user_id, startDate, endDate } = query
    const response = await supabase
        .from('expenses')
        .select('created_at, memo, amount, remaining')
        .eq('user_id', user_id)
        .gt('created_at', startDate)
        .lt('created_at', endDate)

    return response
}
