import { PageContainer } from '../../../Layouts/PageContainer'

import { ExpenseReport } from '../../../components/expense-report/expense-report.component'
import { ExpenseHistory } from '../../../components/expense-history/expense-history.component'
import { ExpenseCategory } from '../../../components/expense-category/expense-category.component'
import { ExpenseProvider } from '../../../context/expense/useExpense'

export const Dashboard = () => {
    return (
        <PageContainer>
            <ExpenseProvider>
                <ExpenseReport />
                <ExpenseHistory />
                <ExpenseCategory />
            </ExpenseProvider>
        </PageContainer>
    )
}
