import { supabase } from '../supabaseClient'

import expenseData from './expenses.data.json'
import reportData from './expense.report.json'

export const addExpenses = async () => {
    const { data, error, status } = await supabase.from('expenses').insert(expenseData)

    if (data) console.log(data)
    if (error) console.log(error)
    console.log(status)
}

export const addMonthlyReport = async () => {
    const { data, error, status } = await supabase.from('monthly_report').insert(reportData)

    if (data) console.log(data)
    if (error) console.log(error)
    console.log(status)
}
