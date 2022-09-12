import { useState } from 'react'
import { ExpenseProvider } from '../../context/expense/useExpense'
import { ColumnContainer } from '../../Layouts/ColumnContainer'
import { ExpenseAddForm } from '../expense-add-form/expense-add-form.component'
import { ExpenseHistory } from '../expense-history/expense-history.component'
import { HighestExpense } from './highest-expense.component'

interface IAddButton {
    handleAddClick: () => void
}

export const ExpenseInfo = () => {
    const [showAddForm, setShowAddForm] = useState<boolean>(true)

    const handleAddClick = () => {
        setShowAddForm(!showAddForm)
    }

    return (
        <ColumnContainer>
            <ExpenseProvider>
                {showAddForm ? (
                    <ExpenseAddForm setShowAddForm={setShowAddForm} />
                ) : (
                    <>
                        <HighestExpense />
                        <ExpenseHistory />
                        <AddButton handleAddClick={handleAddClick} />
                    </>
                )}
            </ExpenseProvider>
        </ColumnContainer>
    )
}

const AddButton = ({ handleAddClick }: IAddButton) => {
    return (
        <div className='my-4 px-6'>
            <button
                className='bg-orange-600 font-semibold text-white w-36 py-3 rounded-md shadow-xl'
                onClick={handleAddClick}
            >
                Add
            </button>
        </div>
    )
}
