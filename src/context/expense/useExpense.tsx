/* eslint-disable camelcase */
import { createContext, ReactNode, useContext, useState } from 'react'
import { getAllExpenseForUser, getExpenseCategoriesWithData, getReportByType } from '../../api/api'
import { useAuth } from '../../features/authentication/context/useAuth'

interface IExpense {
    created_at: string | number | Date
    amount: string | null
    memo: string | null
    remaining: string | null
    category?: string | null
}

interface IReport {
    income: string
    expenditure: string
    remaining: string
}

interface IReportWithImage extends IReport {
    image: string
}

interface ICategoryExpense {
    home: string
    study: string
    travel: string
    friends: string
    work: string
    food: string
    clothes: string
    miscellaneous: string
}

interface IExpenseData {
    data: IExpense[] | []
    report: IReportWithImage | null
    categories: ICategoryExpense | null | object
}

interface IChildren {
    children: ReactNode
}

interface IReportQuery {
    report_type: string
}

interface ICategoryQuery {
    type: string
    value: string
    month?: string
}

interface IContext {
    expense: IExpenseData
    getExpensesPreview: () => void
    getAllExpense: () => void
    getReport: (query: IReportQuery) => void
    getExpenseWithCategories: (query: ICategoryQuery) => void
}

const INTIAL_VALUE: IContext = {
    expense: {
        data: [],
        report: null,
        categories: null,
    },
    getExpensesPreview: () => undefined,
    getAllExpense: () => undefined,
    getReport: () => undefined,
    getExpenseWithCategories: () => undefined,
}

// TODO: find better way to store image object
const image =
    'https://img.freepik.com/free-vector/gold-coins-banknotes-3d-cartoon-style-icon-stack-coins-with-dollar-sign-wad-money-cash-savings-flat-vector-illustration-wealth-economy-finance-profit-currency-concept_74855-25998.jpg?w=2000'

const ExpenseContext = createContext(INTIAL_VALUE)
ExpenseContext.displayName = 'ExpenseContext'

const ExpenseProvider = ({ children }: IChildren) => {
    const [expenseData, setExpenseData] = useState<IExpense[] | []>([])
    const [report, setReport] = useState<IReportWithImage | null>(null)
    const [categories, setCategories] = useState<ICategoryExpense | null | object>(null)
    const { session } = useAuth()
    const hasSession = !!session?.user

    const getExpensesPreview = () => {
        if (!hasSession) return
        getAllExpenseForUser({ user_id: session.user.id, limit: 4 })
            .then(response => {
                const { data, error } = response

                if (error) throw error
                setExpenseData(data)
            })
            .catch(error => {
                throw error
            })
    }

    const getAllExpense = () => {
        if (!hasSession) return
        getAllExpenseForUser({ user_id: session.user.id })
            .then(response => {
                const { data, error } = response

                if (error) throw error
                setExpenseData(data)
            })
            .catch(error => {
                throw error
            })
    }

    const getReport = (query: IReportQuery) => {
        if (!hasSession) return

        getReportByType({ ...query, user_id: session.user.id })
            .then(response => {
                const { data, error } = response

                if (error) throw error
                setReport({
                    ...data,
                    image,
                })
            })
            .catch(error => {
                throw error
            })
    }

    const getExpenseWithCategories = (query: ICategoryQuery) => {
        if (!hasSession) return
        getExpenseCategoriesWithData({ ...query, user_id: session.user.id })
            .then(response => {
                const { data, error } = response

                if (error) throw error
                setCategories({ ...data })
            })
            .catch(error => {
                throw error
            })
    }

    const value: IContext = {
        expense: {
            data: expenseData,
            report,
            categories,
        },
        getExpensesPreview,
        getAllExpense,
        getReport,
        getExpenseWithCategories,
    }
    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

const useExpense = () => {
    const context = useContext(ExpenseContext)

    if (context === undefined) {
        throw new Error('useExpense hook should be used within <ExpenseProvider>')
    }
    return context
}

export { ExpenseContext, ExpenseProvider, useExpense }
