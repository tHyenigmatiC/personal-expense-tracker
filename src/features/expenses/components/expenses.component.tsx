/* eslint-disable camelcase */
import { useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { HistoryCard } from '../../../components/expense-history/history-card.component'
import { ExpenseProvider, useExpense } from '../../../context/expense/useExpense'
import { PageContainer } from '../../../Layouts/PageContainer'

interface IExpense {
    created_at: string | number | Date
    amount: string | null
    memo: string | null
    remaining: string | null
    category?: string | null
}

export const Expenses = () => {
    return (
        <PageContainer classprops='overflow-y-scroll'>
            <ExpenseProvider>
                <ExpenseList />
            </ExpenseProvider>
        </PageContainer>
    )
}

const ExpenseList = () => {
    const { expense, getAllExpense } = useExpense()

    const hasData = !!expense.data.length

    useEffect(() => {
        if (!hasData) getAllExpense()
    }, [hasData])

    let expenseList

    if (hasData) {
        expenseList = (
            <div>
                {expense.data.map((exp: IExpense, index) => {
                    const { amount, created_at, memo, remaining } = exp
                    const props = {
                        className:
                            'flex items-start justify-between shadow rounded-xl py-2 px-8 my-4 bg-bglight dark:bg-hoverDark',
                    }
                    return (
                        <HistoryCard
                            key={index}
                            amount={amount}
                            created_at={created_at}
                            memo={memo}
                            remaining={remaining}
                            {...props}
                        />
                    )
                })}
            </div>
        )
    } else {
        expenseList = (
            <SkeletonTheme
                baseColor='#abf2ab'
                highlightColor='#c7f6c7'
            >
                {[1, 2, 3, 4, 5, 6].map(index => (
                    <Skeleton
                        count={1}
                        height={70}
                        width={600}
                        key={index}
                        className='bg-gray-50 my-2 rounded'
                    />
                ))}
            </SkeletonTheme>
        )
    }
    return (
        <div className='w-full px-20'>
            <p className='text-orange-600 my-4 font-semibold text-2xl'>Expense History</p>
            {expenseList}
        </div>
    )
}
