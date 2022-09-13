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
interface IProps {
    userId: string
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
            <p className='ml-1 text-gray-600 text-sm font-medium'>Expense History</p>
            <div className='flex flex-col bg-tealdark p-4 mt-1 rounded shadow w-full text-sm'>
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
                className='bg-blue-600 text-sm p-2 w-fit mt-4 rounded text-white'
                onClick={handlePrint}
            >
                Print History
            </button>
        </div>
    )
}
