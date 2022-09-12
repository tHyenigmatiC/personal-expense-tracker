import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { CategoryCard } from './card.component'
import { SectionHeader } from '../section-header/section-header.component'

// mock data
import { icons } from '../../assets/icons'
import { useExpense } from '../../context/expense/useExpense'
import { useEffect } from 'react'

export const ExpenseCategory = () => {
    const { expense, getExpenseWithCategories } = useExpense()

    const data = expense.categories

    const currentMonth = new Date().toLocaleDateString('default', { month: 'long' })

    useEffect(() => {
        if (!data) getExpenseWithCategories({ type: 'month', value: currentMonth })
    }, [data])

    let expenseCategory

    if (data) {
        expenseCategory = Object.keys({ ...data }).map(category => {
            const cKey = category as keyof typeof data
            return (
                <CategoryCard
                    type={category}
                    amount={data[cKey]}
                    key={category}
                    icon={icons[cKey]}
                />
            )
        })
    } else {
        expenseCategory = (
            <SkeletonTheme
                baseColor='#abf2ab'
                highlightColor='#c7f6c7'
            >
                {[1, 2, 3, 4].map(index => (
                    <Skeleton
                        height={100}
                        width={150}
                        key={index}
                    />
                ))}
            </SkeletonTheme>
        )
    }
    return (
        <div className='flex flex-col w-full mb-3 mt-4 pl-6'>
            <SectionHeader
                title='Expenditure By Categories'
                detail='this month'
            />
            <div className='grid grid-cols-horizontal-overflow auto-cols-horizontal-overflow grid-flow-col overflow-x-auto p-2 gap-4 w-full'>
                {expenseCategory}
            </div>
        </div>
    )
}
