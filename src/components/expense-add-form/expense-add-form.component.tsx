/* eslint-disable camelcase */
import {
    ChangeEventHandler,
    Dispatch,
    FormEventHandler,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { addMonthlyReport } from '../../api/api'

import { useExpense } from '../../context/expense/useExpense'
import { useAuth } from '../../features/authentication/context/useAuth'
import { CircularLoader } from '../loader/circular-loader.component'
import { Success } from '../success/success.component'

interface IAddButton {
    setShowAddForm: Dispatch<SetStateAction<boolean>>
}

const CATEGORIES = [
    'Home',
    'Food',
    'Travel',
    'Work',
    'Study',
    'Friends',
    'Clothes',
    'Miscellaneous',
]

export const ExpenseAddForm = ({ setShowAddForm }: IAddButton) => {
    const today = new Date()
    const firstDayofMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString()
        .split('T')[0]
    const lastDayToSubmit = today.toISOString().split('T')[0]
    const currentMonth = today.toLocaleDateString('default', { month: 'long' })

    const [formState, setFormState] = useState({
        memo: '',
        amount: 0,
        created_at: lastDayToSubmit,
        remaining: 0,
        category: 'Home',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { expense, getReport } = useExpense()
    const { session } = useAuth()

    const hasData = expense.report

    useEffect(() => {
        // eslint-disable-next-line camelcase
        if (!hasData) getReport({ report_type: currentMonth })
        if (expense.report) {
            setFormState({ ...formState, remaining: parseInt(expense.report.remaining) })
        }
    }, [hasData])

    useEffect(() => {
        if (expense.report) {
            setFormState({
                ...formState,
                remaining: parseInt(expense.report.remaining) - formState.amount,
            })
        }
    }, [formState.amount])

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = e => {
        const name = e.currentTarget.name

        if (name != 'amount') {
            setFormState({ ...formState, [name]: e.currentTarget.value })
            return
        }

        if (!Number(e.currentTarget.value) && e.currentTarget.value != '') return

        if (parseInt(e.currentTarget.value) < 0) {
            setFormState({ ...formState, [name]: 0 })
            return
        }
        if (expense.report && e.currentTarget.value > expense.report.remaining) {
            setFormState({ ...formState, [e.currentTarget.name]: expense.report.remaining })
            return
        }
        setFormState({ ...formState, [e.currentTarget.name]: e.currentTarget.value })
    }

    const canSubmit = formState.amount > 0 && !!formState.memo

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        if (!canSubmit) return
        // eslint-disable-next-line camelcase
        if (session?.user) {
            setIsLoading(true)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { remaining, ...data } = {
                ...formState,
            }

            addMonthlyReport({ ...data })
                .then(() => {
                    setIsLoading(false)
                    setIsSuccess(true)
                    setTimeout(() => {
                        setIsSuccess(false)
                        setShowAddForm(false)
                    }, 500)
                })
                .catch(error => {
                    console.log(error)
                    throw error
                })
        }
    }

    let expenseForm

    const hideCancelButton = isLoading || isSuccess

    if (hasData) {
        expenseForm = (
            <div className='text-white w-11/12'>
                <p className='text-teal-200 dark:bg-transparent dark:text-textDark1 text-lg text-center mb-4 font-semibold'>
                    Add Expense
                </p>
                <form
                    id='add-new-expense'
                    className='flex flex-col px-3 py-2 text-tealdark dark:text-textDark3 items-start justify-center w-95% bg-bglight dark:bg-hoverDark rounded shadow-md'
                    onSubmit={handleSubmit}
                >
                    <div className='my-2 flex flex-col w-full'>
                        <label htmlFor='date'>Date</label>
                        <input
                            id='date'
                            name='date'
                            type='date'
                            value={formState.created_at}
                            max={lastDayToSubmit}
                            min={firstDayofMonth}
                            onChange={handleChange}
                            className='p-2 text-orange-600 my-2 border-2 invalid:border-red-400 border-gray-200 rounded focus:outline-none focus:border-orange-400'
                        />
                    </div>
                    <div className='my-2'>
                        <label htmlFor='memo'>Purpose</label>
                        <input
                            id='memo'
                            name='memo'
                            type='text'
                            placeholder='Purpose for expenditure'
                            onChange={handleChange}
                            value={formState.memo}
                            className='p-2 text-orange-600 w-full my-2 border-2 invalid:border-red-400 border-gray-200 rounded focus:outline-none focus:border-orange-400'
                        />
                    </div>
                    <div className='my-2 w-full'>
                        <label htmlFor='category'>Category</label>
                        <select
                            id='category'
                            name='category'
                            onChange={handleChange}
                            value={formState.category}
                            className='p-2 text-orange-600 w-full my-2 border-2 invalid:border-red-400 border-gray-200 rounded focus:outline-none focus:border-orange-400'
                        >
                            {CATEGORIES.map((category, index) => (
                                <option
                                    value={category}
                                    key={index}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='my-2'>
                        <label htmlFor='amount'>Amount</label>
                        <input
                            id='amount'
                            name='amount'
                            type='text'
                            onChange={handleChange}
                            value={formState.amount}
                            placeholder='Enter amount'
                            min={0}
                            className='p-2 text-orange-600 w-full my-2 border-2 invalid:border-red-400 border-gray-200 rounded focus:outline-none focus:border-orange-400'
                        />
                    </div>
                    <div className='my-2'>
                        <label htmlFor='remaining'>Remaining</label>
                        <input
                            id='remaining'
                            readOnly
                            value={formState.remaining}
                            disabled
                            type='number'
                            className='p-2 text-orange disabled:border-2 disabled:border-orange-400 dark:disabled:border-green-400 disabled:bg-gray-300 text-tealdark w-full my-2 border-2 invalid:border-red-400 border-gray-200 rounded'
                        />
                    </div>
                </form>
                <div className='my-4 flex items-center justify-around w-full'>
                    <button
                        type='submit'
                        form='add-new-expense'
                        className='bg-green-600 dark:bg-green-600 dark:disabled:bg-transparent dark:disabled:hover:bg-transparent dark:border-transparent dark:disabled:border dark:disabled:border-borderDark dark:disabled:text-textDark2 rounded shadow-lg px-10 py-3 disabled:bg-slate-500'
                        disabled={!canSubmit || hideCancelButton}
                    >
                        Add
                    </button>
                    {hideCancelButton ? null : (
                        <button
                            type='button'
                            onClick={() => setShowAddForm(false)}
                            className='bg-red-500 px-6 py-3 rounded dark:bg-transparent dark:border dark:border-red-600 dark:hover:bg-red-500'
                        >
                            Cancel
                        </button>
                    )}

                    {isLoading && <CircularLoader />}
                    {isSuccess && <Success />}
                </div>
            </div>
        )
    } else {
        expenseForm = (
            <SkeletonTheme
                baseColor='#f2f8f8'
                highlightColor='#fff'
            >
                <Skeleton
                    count={1}
                    height={500}
                    width={275}
                    className='bg-gray-50'
                />
            </SkeletonTheme>
        )
    }

    return <>{expenseForm}</>
}
