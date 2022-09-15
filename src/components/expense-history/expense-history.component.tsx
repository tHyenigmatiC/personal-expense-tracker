import { HistoryCard } from './history-card.component'

import { SectionHeader } from '../section-header/section-header.component'

// useExpense Hook
import { useExpense } from '../../context/expense/useExpense'
import { useEffect } from 'react'

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
        expensePreview: { data },
        getExpensesPreview,
    } = useExpense()

    useEffect(() => {
        if (data.length === 0) getExpensesPreview()
    }, [data])

    let expenseHistory

    const hasData = Boolean(data.length)

    if (hasData) {
        expenseHistory = data.map(({ ...data }: IExpense, index) => {
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
                        width={275}
                        key={index}
                        className='bg-gray-50 my-1'
                    />
                ))}
            </SkeletonTheme>
        )
    }

    return (
        <div className='flex flex-col w-full mb-3 mt-10 px-2'>
            <SectionHeader
                title='History'
                detail='last 5 expenses'
            />
            <div className='mt-0'>{expenseHistory}</div>
        </div>
    )
}
