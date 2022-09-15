import { memo, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { DoughnutChart } from '../../../components/doughnut-chart/doughnut-chart.component'

import { ExpenseProvider, useExpense } from '../../../context/expense/useExpense'

interface IChart {
    type: string
    title: string
}

const cleanDataforReport = ({ ...data }) => {
    const { expenditure, remaining } = data
    return {
        spent: expenditure,
        remaining,
    }
}

const CharContainer = ({ type, title }: IChart) => {
    const { getExpenseWithCategories, getReport, categories, report } = useExpense()

    // filter the data according to the type provided
    let data = type === 'report' ? report : categories

    const currentMonth = new Date().toLocaleDateString('default', { month: 'long' })

    useEffect(() => {
        if (!data) {
            // load data based on the type provided
            // eslint-disable-next-line camelcase
            type === 'report' ? getReport({ report_type: currentMonth }) : null

            type === 'categories'
                ? getExpenseWithCategories({ type: 'month', value: currentMonth })
                : null
        }
    }, [data])

    let chartData

    if (data) {
        if (type === 'report') {
            data = cleanDataforReport(data)
        }

        if (type === 'categories') {
            data
        }
        chartData = (
            <DoughnutChart
                title={title}
                data={data}
            />
        )
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

export const nCharts = ({ type, title }: IChart) => {
    return (
        <div>
            <ExpenseProvider>
                <CharContainer
                    type={type}
                    title={title}
                />
            </ExpenseProvider>
        </div>
    )
}

export const Charts = memo(nCharts)
