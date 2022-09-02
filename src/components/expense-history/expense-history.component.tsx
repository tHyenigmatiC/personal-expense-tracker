import { HistoryCard, TransactionHistoryProps } from './history-card.component'

// mock data
import EXPENSE_HISTORY from './expense-history.json'
import { SectionHeader } from '../section-header/section-header.component'

export const ExpenseHistory = () => {
    const expenseHistory = EXPENSE_HISTORY.map(({ ...history }: TransactionHistoryProps, index) => {
        return (
            <HistoryCard
                key={index}
                {...history}
            />
        )
    })

    return (
        <div className='flex flex-col w-full mb-3 mt-10 px-6'>
            <SectionHeader
                title='Expenditure History'
                detail='Last 4 expenses'
            />
            <div className='grid grid-cols-2 gap-x-8'>{expenseHistory}</div>
        </div>
    )
}
