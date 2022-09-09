/* eslint-disable camelcase */
import { createContext, ReactNode, useContext, useState } from 'react'
import { getAllExpenseForUser, getReportByType } from '../../api/api'

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

interface IExpenseData {
    data: IExpense[] | []
    report: IReportWithImage | null | object
}

interface IContext {
    expense: IExpenseData
    getExpenses: (user_id: string) => void
    getReport: (query: IReportParam) => void
}

interface IChildren {
    children: ReactNode
}

interface IReportParam {
    report_type: string
    user_id: string
}

const INTIAL_VALUE: IContext = {
    expense: {
        data: [],
        report: null,
    },
    getExpenses: () => undefined,
    getReport: () => undefined,
}

// TODO: find better way to store image object
const image =
    'https://img.freepik.com/free-vector/gold-coins-banknotes-3d-cartoon-style-icon-stack-coins-with-dollar-sign-wad-money-cash-savings-flat-vector-illustration-wealth-economy-finance-profit-currency-concept_74855-25998.jpg?w=2000'

const ExpenseContext = createContext(INTIAL_VALUE)
ExpenseContext.displayName = 'ExpenseContext'

const ExpenseProvider = ({ children }: IChildren) => {
    const [expenseData, setExpenseData] = useState<IExpense[] | []>([])
    const [report, setReport] = useState<IReportWithImage | null>(null)

    const getExpenses = (userId: string) => {
        getAllExpenseForUser(userId)
            .then(response => {
                const { data, error } = response

                if (error) throw error
                setExpenseData(data)
            })
            .catch(error => {
                console.log(error)
                throw error
            })
    }

    const getReport = (query: IReportParam) => {
        getReportByType(query)
            .then(response => {
                const { data, error } = response

                if (error) throw error
                setReport({
                    ...data,
                    image,
                })
            })
            .catch(error => {
                console.log(error)
                throw error
            })
    }

    const value: IContext = {
        expense: {
            data: expenseData,
            report,
        },
        getExpenses,
        getReport,
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

export { ExpenseProvider, useExpense }
