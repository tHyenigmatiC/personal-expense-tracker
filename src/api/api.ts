/* eslint-disable camelcase */
import { supabase } from '../db/supabaseClient'

interface IUser {
    user_id: string
}

interface IExpenseQuery extends IUser {
    limit?: number
}

interface IReportQuery extends IUser {
    report_type: string
}

interface ICategoryQuery extends IUser {
    type: string
    value: string
    month?: string
}

interface IExpenseData {
    amount: number
    remaining: number
    created_at: string
    memo: string
    user_id: string
}

export const getAllExpenseForUser = async ({ user_id, limit = 50 }: IExpenseQuery) => {
    const response = await supabase
        .from('expenses')
        .select('created_at, amount, remaining, memo ')
        .eq('user_id', user_id)
        .limit(limit)

    return response
}

export const getReportByType = async ({ report_type, user_id }: IReportQuery) => {
    const response = await supabase
        .from('monthly_report')
        .select('income, expenditure, remaining ')
        .eq('user_id', user_id)
        .eq('month', report_type)
        .single()

    return response
}

export const getExpenseCategoriesWithData = async ({ user_id, type, value }: ICategoryQuery) => {
    const response = await supabase
        .from('expense_category_data')
        .select('home, study, travel, friends, work, food, clothes, miscellaneous')
        .eq('user_id', user_id)
        .eq(type, value)
        .single()
    return response
}

export const addMonthlyReport = async (expenseData: IExpenseData) => {
    const { data, error, status } = await supabase.from('expenses').insert(expenseData)

    if (data) console.log(data)
    if (error) console.log(error)
    console.log(status)
}
