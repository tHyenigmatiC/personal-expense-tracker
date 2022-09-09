import { supabase } from '../supabaseClient'

import expenseData from './expenses.data.json'

export const addExpenses = async () => {
    const { data, error, status } = await supabase.from('expenses').insert(expenseData)

    if (data) console.log(data)
    if (error) console.log(error)
    console.log(status)
}
