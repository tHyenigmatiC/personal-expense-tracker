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

import { useExpense } from '../../context/expense/useExpense'

interface IAddButton {
    setShowAddForm: Dispatch<SetStateAction<boolean>>
}

export const ExpenseAddForm = ({ setShowAddForm }: IAddButton) => {
    const [formState, setFormState] = useState({
        memo: '',
        amount: 0,
    })

    const { expense, getReport } = useExpense()

    const [remainingAmount, setRemainingAmount] = useState(0)

    const hasData = expense.report

    const currentMonth = new Date().toLocaleDateString('default', { month: 'long' })

    useEffect(() => {
        // eslint-disable-next-line camelcase
        if (!hasData) getReport({ report_type: currentMonth })
        if (expense.report && expense.report) setRemainingAmount(parseInt(expense.report.remaining))
    }, [hasData])

    useEffect(() => {
        if (expense.report) {
            setRemainingAmount(parseInt(expense.report.remaining) - formState.amount)
        }
    }, [formState.amount])

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        if (e.currentTarget.name === 'memo') {
            setFormState({ ...formState, [e.currentTarget.name]: e.currentTarget.value })
            return
        }

        if (!Number(e.currentTarget.value) && e.currentTarget.value != '') return

        if (parseInt(e.currentTarget.value) < 0) {
            setFormState({ ...formState, [e.currentTarget.name]: 0 })
            return
        }
        if (expense.report && e.currentTarget.value > expense.report.remaining) {
            setFormState({ ...formState, [e.currentTarget.name]: expense.report.remaining })
            return
        }
        setFormState({ ...formState, [e.currentTarget.name]: e.currentTarget.value })
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        console.log(formState)
    }

    let expenseForm

    if (hasData) {
        expenseForm = (
            <div className='px-3 py-6 bg-teal-600 rounded-md shadow-md text-white'>
                <form
                    className='flex flex-col items-start justify-center w-95%'
                    onSubmit={handleSubmit}
                >
                    <div className='my-2'>
                        <label htmlFor='memo'>Purpose</label>
                        <input
                            id='memo'
                            name='memo'
                            type='text'
                            onChange={handleChange}
                            value={formState.memo}
                            className='p-2 text-orange-600 font-semibold my-2 border-2 invalid:border-red-400 border-gray-200 rounded focus:outline-none focus:border-orange-400'
                        />
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
                            className='p-2 text-orange-600 font-semibold my-2 border-2 invalid:border-red-400 border-gray-200 rounded focus:outline-none focus:border-orange-400'
                        />
                    </div>
                    <div className='my-2'>
                        <label htmlFor='remaining'>Remaining</label>
                        <input
                            id='remaining'
                            value={remainingAmount}
                            disabled
                            type='number'
                            className='p-2 text-orange disabled:border disabled:border-teal-200 my-2 rounded disabled:bg-orange-100 text-tealdark'
                        />
                    </div>
                </form>
            </div>
        )
    } else {
        expenseForm = (
            <SkeletonTheme
                baseColor='#fcb377'
                highlightColor='#FB923C'
            >
                <Skeleton
                    count={1}
                    height={400}
                    width={275}
                    className='bg-gray-50'
                />
            </SkeletonTheme>
        )
    }

    return <>{expenseForm}</>
}
