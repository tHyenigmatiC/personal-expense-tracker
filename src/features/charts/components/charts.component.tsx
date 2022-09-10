import { memo, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { ColumnContainer } from '../../../Layouts/ColumnContainer'
import { DoughnutChart } from '../../../components/doughnut-chart/doughnut-chart.component'
import EventCalendar from '../../calendar'

import { ExpenseProvider, useExpense } from '../../../context/expense/useExpense'

const cleanExpenseDataForChart = ({ ...data }) => {
    const { expenditure, remaining } = data
    return {
        spent: expenditure,
        remaining,
    }
}

const CharContainer = () => {
    const { getReport, expense } = useExpense()

    const data = expense.report

    const currentMonth = new Date().toLocaleDateString('default', { month: 'long' })

    useEffect(() => {
        if (!data)
            // eslint-disable-next-line camelcase
            getReport({ report_type: currentMonth })
    }, [data])

    let chartData

    if (data) {
        chartData = <DoughnutChart {...cleanExpenseDataForChart({ ...expense.report })} />
    } else {
        chartData = (
            <SkeletonTheme
                baseColor='#abf2ab'
                highlightColor='#c7f6c7'
            >
                <Skeleton
                    count={1}
                    height={200}
                    width={200}
                    circle
                />
            </SkeletonTheme>
        )
    }
    return <>{chartData}</>
}

export const nCharts = () => {
    return (
        <ColumnContainer>
            <ExpenseProvider>
                <CharContainer />
            </ExpenseProvider>
            <EventCalendar />
        </ColumnContainer>
    )
}

export const Charts = memo(nCharts)
