/* eslint-disable camelcase */
import { useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { HistoryCard } from '../../../components/expense-history/history-card.component'
import { EXPENSE_ITEMS_IN_ONE_PAGE } from '../../../constants'
import { ExpenseProvider, useExpense } from '../../../context/expense/useExpense'
import { PageContainer } from '../../../Layouts/PageContainer'

interface IExpense {
    created_at: string | number | Date
    amount: string | null
    memo: string | null
    remaining: string | null
    category?: string | null
}

interface IPagination {
    count: number | undefined
    page: number
    getAllExpense: (page: number) => void
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
    const { expenses, getAllExpense } = useExpense()

    const { data, count, page } = expenses

    const hasData = !!data.length

    useEffect(() => {
        if (!hasData) getAllExpense(page)
    }, [hasData])

    let expenseList

    if (hasData) {
        expenseList = (
            <div>
                {data.map((exp: IExpense, index) => {
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
            <Pagination
                page={page}
                count={count}
                getAllExpense={getAllExpense}
            />
        </div>
    )
}

const Pagination = ({ page, count, getAllExpense }: IPagination) => {
    const disableNext = !!(
        count && count - page * EXPENSE_ITEMS_IN_ONE_PAGE < EXPENSE_ITEMS_IN_ONE_PAGE
    )
    const disablePrevious = page == 1

    const gotoNextPage = () => {
        getAllExpense(page + 1)
    }

    const gotoPreviousPage = () => {
        getAllExpense(page - 1)
    }

    return (
        <div className='border border-orange-600 rounded flex items-center text-orange-600 font-semibold w-fit px-4 justify-around'>
            <button
                type='button'
                disabled={disablePrevious}
                onClick={gotoPreviousPage}
                className='border-r border-orange-600 dark:border-white pr-4 py-2 text-2xl disabled:text-gray-400 dark:disabled:text-borderDark'
            >
                {'<'}
            </button>
            <p className='white px-2 py-2 mx-6 text-center'>{page}</p>
            <button
                type='button'
                disabled={disableNext}
                onClick={gotoNextPage}
                className='border-l border-orange-600 dark:border-white pl-4 py-2 text-2xl disabled:text-gray-400 dark:disabled:text-borderDark'
            >
                {'>'}
            </button>
        </div>
    )
}
