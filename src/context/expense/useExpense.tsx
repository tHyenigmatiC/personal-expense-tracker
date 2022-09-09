/* eslint-disable camelcase */
import { createContext, ReactNode, useContext, useState } from 'react'
import { getAllExpenseForUser } from '../../api/api'

interface IExpense {
    created_at: string | number | Date
    amount: string | null
    memo: string | null
    remaining: string | null
    category?: string | null
}

interface IExpenseData {
    data: IExpense[] | []
}

interface IContext {
    expense: IExpenseData
    getExpenses: (user_id: string) => void
}

interface IChildren {
    children: ReactNode
}

const INTIAL_VALUE: IContext = {
    expense: {
        data: [],
    },
    getExpenses: () => undefined,
}

const ExpenseContext = createContext(INTIAL_VALUE)
ExpenseContext.displayName = 'ExpenseContext'

const ExpenseProvider = ({ children }: IChildren) => {
    const [expenseData, setExpenseData] = useState<IExpense[] | []>([])

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

    const value: IContext = {
        expense: {
            data: expenseData,
        },
        getExpenses,
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
