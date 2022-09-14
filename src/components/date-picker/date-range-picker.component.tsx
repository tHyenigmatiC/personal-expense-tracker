import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { useDateRange } from '../../context/useDateRange'

export const DateRangePicker = () => {
    const { fromDate, toDate } = useDateRange()
    const [startDate, updateStartDate] = fromDate
    const [endDate, updateEndDate] = toDate
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return (
        <div className='flex items-center my-2'>
            <span className='mr-2 text-white dark:text-orange-400'>From:</span>
            <DatePicker
                selected={startDate}
                onChange={(date: Date) => updateStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={startDate}
                maxDate={yesterday}
                className='py-2 px-1 w-full'
            />
            <span className='ml-4 mr-2 text-white dark:text-green-400'>To:</span>
            <DatePicker
                selected={endDate}
                onChange={(date: Date) => updateEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                maxDate={today}
                className='py-2 px-1 w-full'
            />
        </div>
    )
}
