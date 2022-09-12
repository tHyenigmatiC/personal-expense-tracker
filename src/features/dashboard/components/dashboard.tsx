import { PageContainer } from '../../../Layouts/PageContainer'

import { ExpenseReport } from '../../../components/expense-report/expense-report.component'
import { ExpenseCategory } from '../../../components/expense-category/expense-category.component'
import { ExpenseProvider } from '../../../context/expense/useExpense'
import Charts from '../../charts'

export const Dashboard = () => {
    return (
        <PageContainer>
            <ExpenseProvider>
                <ExpenseReport />
                <div className='bg-bgmedium w-11/12 h-64 m-4 py-4 rounded-md shadow-md flex justify-around'>
                    <Charts
                        type='report'
                        title='Monthly Report'
                    />
                    <Charts
                        type='categories'
                        title='Expenditure by Categories'
                    />
                </div>
                <ExpenseCategory />
            </ExpenseProvider>
        </PageContainer>
    )
}
