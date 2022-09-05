import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { useDateRange } from '../../context/useDateRange'

export const DateRangePicker = () => {
    const { fromDate, toDate } = useDateRange()
    const [startDate, updateStartDate] = fromDate
    const [endDate, updateEndDate] = toDate
    return (
        <div className='flex items-center my-2'>
            <span className='mr-2 text-white'>From:</span>
            <DatePicker
                selected={startDate}
                onChange={(date: Date) => updateStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className='py-2 px-1 w-full'
            />
            <span className='ml-4 mr-2 text-white'>To:</span>
            <DatePicker
                selected={endDate}
                onChange={(date: Date) => updateEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className='py-2 px-1 w-full'
            />
        </div>
    )
}
