import { ColumnContainer } from '../../../Layouts/ColumnContainer'
import { DoughnutChart } from '../../../components/doughnut-chart/doughnut-chart.component'
import EventCalendar from '../../calendar'

import EXPENSE_REPORT_DATA from '../../../mock-data/expense-report.json'

const cleanExpenseDataForChart = ({ ...data }) => {
    const { expenditure, remaining } = data
    return {
        spent: expenditure,
        remaining,
    }
}

export const Charts = () => {
    return (
        <ColumnContainer>
            <DoughnutChart {...cleanExpenseDataForChart(EXPENSE_REPORT_DATA)} />
            <EventCalendar />
        </ColumnContainer>
    )
}
