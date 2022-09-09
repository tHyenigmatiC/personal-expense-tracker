/* eslint-disable camelcase */
import { supabase } from '../db/supabaseClient'

interface IReportParam {
    report_type: string
    user_id: string
}

export const getAllExpenseForUser = async (user_id: string) => {
    const response = await supabase
        .from('expenses')
        .select('created_at, amount, remaining, memo ')
        .eq('user_id', user_id)
        .limit(4)

    return response
}

export const getReportByType = async ({ report_type, user_id }: IReportParam) => {
    const response = await supabase
        .from('monthly_report')
        .select('income, expenditure, remaining ')
        .eq('user_id', user_id)
        .eq('month', report_type)
        .single()

    return response
}
