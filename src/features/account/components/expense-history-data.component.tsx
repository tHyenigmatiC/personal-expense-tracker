/* eslint-disable camelcase */
import { forwardRef, LegacyRef, useCallback, useRef, useState, Suspense } from 'react'
import { useReactToPrint } from 'react-to-print'

import { DateRangePicker } from '../../../components/date-picker/date-range-picker.component'
import { useDateRange } from '../../../context/useDateRange'
import { useAuth } from '../../authentication/context/useAuth'
import { getExpensesBetween } from '../services/api'

type IRef = LegacyRef<HTMLDivElement>

interface IExpense {
    memo: string
    created_at: string
    amount: string
    remaining: string
}

interface IData {
    data: IExpense[]
}

export const ExpenseHistoryData = ({ userId }: { userId: string }) => {
    const {
        fromDate: [startDate],
        toDate: [endDate],
    } = useDateRange()

    const componentRef = useRef(null)

    const [isPrinting, setIsPrinting] = useState(false)
    const onBeforeGetContentResolve = useRef<((value: any) => void) | null>(null)
    const dataRef = useRef<IExpense[] | null>(null)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
            return new Promise(resolve => {
                loadData()
                onBeforeGetContentResolve.current = resolve
            })
        },
        onAfterPrint: () => setIsPrinting(false),
        onPrintError: () => setIsPrinting(false),
    })

    const loadData = () => {
        getExpensesBetween({
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            // eslint-disable-next-line camelcase
            user_id: userId,
        })
            .then(response => {
                const { data, error } = response
                if (error) throw error
                if (data) dataRef.current = data
                setIsPrinting(true)
            })
            .catch(error => {
                console.log(error)
                throw error
            })
    }

    const callbackRef = useCallback((node: any) => {
        if (node !== null && onBeforeGetContentResolve.current !== null) {
            componentRef.current = node
            onBeforeGetContentResolve.current('print')
        }
    }, [])

    return (
        <div className='flex flex-col items-start self-center my-8'>
            <p className='ml-1 text-gray-600 dark:text-textDark3 text-sm font-medium'>
                Expense History
            </p>
            <div className='flex flex-col bg-tealdark dark:bg-hoverDark p-4 mt-1 rounded shadow w-full text-sm'>
                <DateRangePicker />
            </div>

            <div style={{ display: 'none' }}>
                {isPrinting && (
                    <Suspense fallback={null}>
                        <PrintHistory
                            data={dataRef.current ? dataRef.current : []}
                            ref={callbackRef}
                        />
                    </Suspense>
                )}
            </div>

            <button
                type='button'
                className='bg-blue-600 text-sm p-2 w-fit mt-4 rounded text-white dark:border dark:border-blue-600 dark:hover:bg-blue-600 dark:bg-transparent'
                onClick={handlePrint}
            >
                Print History
            </button>
        </div>
    )
}

const PrintHistory = forwardRef(({ data }: IData, ref: IRef) => {
    const { session } = useAuth()
    const today = new Date().toISOString().split('T')[0]
    return (
        <div
            ref={ref}
            className='flex flex-col items-center my-4 '
        >
            <TextLogo />
            <div className='flex items-center justify-between w-5/6 px-6 py-2 mx-auto my-2'>
                <p className='text-lg font-semibold text-orange-600'>
                    <span className='text-gray-600 font-normal'>Name: </span>{' '}
                    {session?.user ? session.user.user_metadata.name : null}
                </p>
                <p className='text-lg font-semibold text-orange-600'>
                    <span className='text-gray-600 font-normal'>Date:</span> {today}
                </p>
            </div>
            <DataTable data={data} />
        </div>
    )
})
PrintHistory.displayName = 'PrintHistory'

const DataTable = ({ data }: IData) => {
    const columnHeader = Object.keys(data[0])
    return (
        <table className='table-auto border-2 border-tealdark w-5/6 mx-auto'>
            <thead className='text-center text-teallight mx-auto w-full bg-tealdark border-b border-slate-400'>
                <tr>
                    {columnHeader.map(header => (
                        <th
                            className='border-r border-slate-400 p-6'
                            key={header}
                        >
                            {header === 'created_at' ? 'DATE' : header.toUpperCase()}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className='bg-orange-50 text-teal-800'>
                {data.map(({ memo, created_at, amount, remaining }: IExpense, index) => (
                    <tr
                        key={index}
                        className='my-2 border-r border-slate-400 text-center'
                    >
                        <td className='p-4 border-r text-lg border-b border-slate-400 text-center'>
                            {new Date(created_at).toISOString().split('T')[0]}
                        </td>
                        <td className='p-4 border-r text-lg border-b border-slate-400 text-center'>
                            {memo}
                        </td>
                        <td className='p-4 border-r text-lg border-b border-slate-400 text-center text-red-600'>
                            Rs {amount}
                        </td>
                        <td className='p-4 border-r text-lg border-b border-slate-400 text-center text-green-600'>
                            Rs {remaining}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const TextLogo = () => {
    return (
        <div className='text-center my-6'>
            <p className={'font-bold drop-shadow-lg text-orange-600 text-4xl'}>
                P<span className='text-6xl'>€</span>T
            </p>
            <p className={'text-orange-600 font-semibold text-lg'}>Personal Expense Tracker</p>
        </div>
    )
}
