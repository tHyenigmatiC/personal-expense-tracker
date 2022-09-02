import { formatDistanceToNow, parseISO, format } from 'date-fns'

export interface TransactionHistoryProps {
    amount: string | number
    date: string
    purpose: string
    remaining: string | number
}

export const HistoryCard = ({ amount, date, purpose, remaining }: TransactionHistoryProps) => {
    const formattedDate = format(new Date(date), 'LLL dd hh:mm a')
    const timeAgo = formatDistanceToNow(parseISO(date))

    return (
        <div className='flex items-start justify-between shadow rounded-xl px-6 py-2 my-1 bg-white'>
            <div>
                <p className='text-xs text-tealdark'>{formattedDate}</p>
                <p className='my-2 font-medium text-gray-600 text-sm'>{purpose}</p>
            </div>
            <div className='flex flex-col items-start'>
                <p className='my-1 text-red-600 text-sm'>Spent: Rs.{amount}</p>
                <p className='my-1 text-green-600 text-sm'>Remaining: Rs.{remaining}</p>
            </div>
        </div>
    )
}
