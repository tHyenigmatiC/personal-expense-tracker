import { CategoryCard } from './category-card.component'
import { SectionHeader } from '../section-header/section-header.component'

// mock data
import { ExpenseCategoryData } from './expense-category'

interface ExpenseCategoryProps {
    category: string
    amount: string
    icon: string
}

export const ExpenseCategory = () => {
    const expenseCategory = ExpenseCategoryData.map(
        ({ category, amount, icon }: ExpenseCategoryProps) => {
            return (
                <CategoryCard
                    type={category}
                    amount={amount}
                    key={category}
                    icon={icon}
                />
            )
        },
    )
    return (
        <div className='flex flex-col w-full mb-3 mt-4 pl-6'>
            <SectionHeader
                title='Expenditure By Categories'
                detail='sorted by highest'
            />
            <div className='grid grid-cols-horizontal-overflow auto-cols-horizontal-overflow grid-flow-col overflow-x-auto p-4 gap-4 w-full'>
                {expenseCategory}
            </div>
        </div>
    )
}
