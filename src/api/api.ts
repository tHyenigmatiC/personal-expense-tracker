import { supabase } from '../db/supabaseClient'

// eslint-disable-next-line camelcase
export const getAllExpenseForUser = async (user_id: string) => {
    const response = await supabase
        .from('expenses')
        .select('created_at, amount, remaining, memo ')
        .eq('user_id', user_id)

    return response
}
