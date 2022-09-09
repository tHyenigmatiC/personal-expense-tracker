/* eslint-disable camelcase */
import { format } from 'date-fns'

interface IExpense {
    created_at: string | number | Date
    amount: string | null
    memo: string | null
    remaining: string | null
    category?: string | null
}

export const HistoryCard = ({ amount, created_at, memo, remaining }: IExpense) => {
    const formattedDate = format(new Date(created_at), 'LLL dd hh:mm a')

    return (
        <div className='flex items-start justify-between shadow rounded-xl px-6 py-2 my-1 bg-white'>
            <div>
                <p className='text-xs text-tealdark'>{formattedDate}</p>
                <p className='my-2 font-medium text-gray-600 text-sm'>{memo}</p>
            </div>
            <div className='flex flex-col items-start'>
                <p className='my-1 text-red-600 text-sm'>Spent: Rs.{amount}</p>
                <p className='my-1 text-green-600 text-sm'>Remaining: Rs.{remaining}</p>
            </div>
        </div>
    )
}
