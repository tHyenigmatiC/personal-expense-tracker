import { PageContainer } from '../../../Layouts/PageContainer'

import { ExpenseReport } from '../../../components/expense-report/expense-report.component'
import { ExpenseHistory } from '../../../components/expense-history/expense-history.component'
import { ExpenseCategory } from '../../../components/expense-category/expense-category.component'

export const Dashboard = () => {
    return (
        <PageContainer>
            <ExpenseReport />
            <ExpenseHistory />
            <ExpenseCategory />
        </PageContainer>
    )
}
