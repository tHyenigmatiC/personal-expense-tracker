import { useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// expense card
import { ExpenseCard } from '../expense-card/expense-card.compnent'

import { useExpense } from '../../context/expense/useExpense'

import { getIconProps, BankNotesIcon } from '../../assets/heroicons'

export const ExpenseReport = () => {
    const { getReport, expense } = useExpense()

    const data = expense.report

    const currentMonth = new Date().toLocaleDateString('default', { month: 'long' })

    useEffect(() => {
        // eslint-disable-next-line camelcase
        if (!data) getReport({ report_type: currentMonth })
    }, [data])

    const hasData = !!expense.report

    let reportData

    if (hasData) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image, ...reportTypes } = { ...expense.report }
        const types = Object.keys(reportTypes)
        reportData = types.map(key => {
            const amount = reportTypes[key as keyof typeof reportTypes]
            return (
                <ExpenseCard
                    type={key}
                    amount={amount ?? '0'}
                    icon={<BankNotesIcon {...getIconProps('Bank Note')} />}
                    key={key}
                />
            )
        })
    } else {
        reportData = (
            <SkeletonTheme
                baseColor='#abf2ab'
                highlightColor='#c7f6c7'
            >
                {[1, 2, 3].map(index => (
                    <Skeleton
                        count={1}
                        height={90}
                        width={200}
                        key={index}
                    />
                ))}
            </SkeletonTheme>
        )
    }

    // const types = Object.keys(otherData)
    return (
        <div className='flex flex-col w-full px-9'>
            <p className='text-2xl text-start text-tealdark'>{currentMonth} 2022</p>
            <div className='grid w-10/12 grid-cols-3 gap-8 mt-4'>{reportData}</div>
        </div>
    )
}
