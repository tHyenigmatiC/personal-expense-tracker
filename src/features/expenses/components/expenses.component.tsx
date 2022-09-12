import { useEffect } from 'react'
import { ExpenseProvider, useExpense } from '../../../context/expense/useExpense'
import { PageContainer } from '../../../Layouts/PageContainer'

export const Expenses = () => {
    return (
        <PageContainer>
            <ExpenseProvider>
                <div></div>
            </ExpenseProvider>
        </PageContainer>
    )
}

const ExpenseList = () => {
    const { expense, getAllExpense } = useExpense()

    const hasData = !!expense.data.length

    useEffect(() => {
        if (!hasData) getAllExpense()
    }, [hasData])

    let expenseList

    if(hasData) {
        expenseList = (
            
        )
    } else {
        
    }
    return <div></div>
}
