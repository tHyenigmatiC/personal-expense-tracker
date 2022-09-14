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
    const [showAddForm, setShowAddForm] = useState<boolean>(false)

    const handleAddClick = () => {
        setShowAddForm(!showAddForm)
    }

    return (
        <ExpenseProvider>
            {showAddForm ? (
                <div className='flex flex-col items-center justify-start w-1/4 h-screen bg-tealdark dark:bg-bgDark min-hs-screen py-6 px-2'>
                    <ExpenseAddForm setShowAddForm={setShowAddForm} />
                </div>
            ) : (
                <ColumnContainer>
                    <HighestExpense />
                    <ExpenseHistory />
                    <AddButton handleAddClick={handleAddClick} />
                </ColumnContainer>
            )}
        </ExpenseProvider>
    )
}

const AddButton = ({ handleAddClick }: IAddButton) => {
    return (
        <div className='px-6'>
            <button
                className='bg-orange-600 dark:bg-transparent dark:hover:bg-orange-600 dark:hover:text-textDark1 dark:border-2 dark:border-orange-600 font-semibold text-white w-36 py-3 rounded-md shadow-xl'
                onClick={handleAddClick}
            >
                Add
            </button>
        </div>
    )
}
