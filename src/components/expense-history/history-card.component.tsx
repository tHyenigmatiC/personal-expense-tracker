/* eslint-disable camelcase */
import { format } from 'date-fns'

interface IExpense {
    created_at: string | number | Date
    amount: string | null
    memo: string | null
    remaining: string | null
    category?: string | null
}

export const HistoryCard = ({ amount, created_at, memo, remaining, ...otherProps }: IExpense) => {
    const formattedDate = format(new Date(created_at), 'LLL dd hh:mm a')

    return (
        <div
            className='flex items-start justify-between shadow rounded-xl p-2 my-3 bg-bglight dark:bg-hoverDark'
            {...otherProps}
        >
            <div className='flex flex-col items-start'>
                <p className='my-1 text-xs text-tealdark dark:text-textDark2'>{formattedDate}</p>
                <p className='my-1 font-medium text-gray-600 dark:text-textDark3 text-sm'>{memo}</p>
            </div>
            <div className='flex flex-col items-end'>
                <p className='my-1 text-red-600 dark:text-red-400 text-sm'>
                    <b>-</b> Rs.{amount}
                </p>
                <p className='my-1 text-green-600 dark:text-green-400 text-sm'>
                    <b>=</b> Rs.{remaining}
                </p>
            </div>
        </div>
    )
}
