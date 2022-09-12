import { useEffect } from 'react'
import { useExpense } from '../../context/expense/useExpense'
import { icons } from '../../assets/icons'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const HighestExpense = () => {
    const { expense, getExpenseWithCategories } = useExpense()

    const hasData = expense.categories
    const currentMonth = new Date().toLocaleDateString('default', { month: 'long' })

    useEffect(() => {
        if (!hasData) getExpenseWithCategories({ type: 'month', value: currentMonth })
    }, [hasData])

    let expenseData

    if (expense.categories) {
        const { type, amount } = getHighestValue(expense.categories)

        expenseData = (
            <div className='flex flex-row m-auto items-center justify-center mt-2 py-2 px-6 shadow-md bg-orange-600 h-28 rounded-md w-fit'>
                <img
                    src={icons[type as keyof typeof icons]}
                    className='w-16 h-16'
                />
                <div className='flex flex-col items-center bg-orange-400 rounded mx-2 justify-center py-2 px-4'>
                    <p className='text-xl font-medium text-white capitalize'>{type}</p>
                    <p className='text-2xl font-bold text-red-600'>
                        <span className='text-base'>Rs </span>
                        {amount.toLocaleString('en-US')}
                    </p>
                </div>
            </div>
        )
    } else {
        expenseData = (
            <SkeletonTheme
                baseColor='#abf2ab'
                highlightColor='#c7f6c7'
            >
                <div className='m-auto w-fit'>
                    <Skeleton
                        count={1}
                        height={100}
                        width={210}
                    />
                </div>
            </SkeletonTheme>
        )
    }

    return (
        <div className='w-full mx-2'>
            <p className='text-orange-600 text-center font-semibold'>
                Where you have spent the most?
            </p>
            {expenseData}
        </div>
    )
}

const getHighestValue = ({ ...array }) => {
    const entries = Object.entries(array)
    return entries.reduce(
        (highest, value) => {
            return parseInt(value[1]) > highest.amount
                ? { type: value[0], amount: value[1] }
                : highest
        },
        { type: '', amount: 0 },
    )
}
