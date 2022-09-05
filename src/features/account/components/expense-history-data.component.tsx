import { DateRangePicker } from '../../../components/date-picker/date-range-picker.component'
import { useDateRange } from '../../../context/useDateRange'

export const ExpenseHistoryData = () => {
    const {
        fromDate: [startDate],
        toDate: [endDate],
    } = useDateRange()

    const handlePrint = () => {
        alert(JSON.stringify({ startDate, endDate }))
        // api call to backend for all the related data
    }
    return (
        <div className='flex flex-col items-start self-center my-8'>
            <p className='ml-1 text-gray-600 text-sm font-medium'>Expense History</p>
            <div className='flex flex-col bg-tealdark p-4 mt-1 rounded shadow w-full text-sm'>
                <DateRangePicker />
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
