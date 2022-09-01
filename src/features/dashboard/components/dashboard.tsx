import { PageContainer } from '../../../Layouts/PageContainer'

import { ExpenseReport } from '../../../components/expense-report/expense-report.component'

export const Dashboard = () => {
    return (
        <PageContainer title='Dashboard'>
            <ExpenseReport />
        </PageContainer>
    )
}
