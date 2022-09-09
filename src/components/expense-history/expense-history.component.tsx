import { HistoryCard } from './history-card.component'

import { SectionHeader } from '../section-header/section-header.component'

// useExpense Hook
import { useExpense } from '../../context/expense/useExpense'
import { useEffect } from 'react'
import { useAuth } from '../../features/authentication/context/useAuth'

// Temporary Workaround
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface IExpense {
    created_at: string | number | Date
    amount: string | null
    memo: string | null
    remaining: string | null
    category?: string | null
}

export const ExpenseHistory = () => {
    const {
        expense: { data: expenseData },
        getExpenses,
    } = useExpense()

    const { session } = useAuth()

    useEffect(() => {
        const loadExpenseData = expenseData.length === 0 && session?.user
        if (loadExpenseData) getExpenses(session?.user?.id)
    }, [expenseData, session])

    let expenseHistory

    const hasData = Boolean(expenseData.length)

    if (hasData) {
        expenseHistory = expenseData.map(({ ...data }: IExpense, index) => {
            return (
                <HistoryCard
                    key={index}
                    {...data}
                />
            )
        })
    } else {
        expenseHistory = (
            <SkeletonTheme
                baseColor='#abf2ab'
                highlightColor='#c7f6c7'
            >
                {[1, 2, 3, 4].map(index => (
                    <Skeleton
                        count={1}
                        height={70}
                        width={350}
                        key={index}
                        className='bg-gray-50'
                    />
                ))}
            </SkeletonTheme>
        )
    }

    return (
        <div className='flex flex-col w-full mb-3 mt-10 px-6'>
            <SectionHeader
                title='Expenditure History'
                detail='Last 4 expenses'
            />
            <div className='grid grid-cols-2 gap-x-8 gap-y-2'>{expenseHistory}</div>
        </div>
    )
}
