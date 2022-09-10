import { memo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

// customized calendar styles
import './calendar.css'

export const nEventCalendar = () => {
    return (
        <div className='w-11/12 h-64 mt-10'>
            <Calendar className='text-white !bg-orange-500 rounded-2xl shadow !border-none' />
        </div>
    )
}

export const EventCalendar = memo(nEventCalendar)
