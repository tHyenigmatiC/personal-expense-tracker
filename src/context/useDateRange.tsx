import { createContext, useContext, useState } from 'react'

interface IDateRange {
    fromDate: [Date, React.Dispatch<React.SetStateAction<Date>>]
    toDate: [Date, React.Dispatch<React.SetStateAction<Date>>]
}

interface ChildrenProps {
    children: React.ReactNode
}

const DateRangeContext = createContext<IDateRange | undefined>(undefined)
DateRangeContext.displayName = 'DateRangeContext'
export { DateRangeContext }

export const DateRangeProvider = ({ children }: ChildrenProps) => {
    const value = {
        fromDate: useState<Date>(new Date()),
        toDate: useState<Date>(new Date()),
    }
    return <DateRangeContext.Provider value={value}>{children}</DateRangeContext.Provider>
}

export const useDateRange = () => {
    const context = useContext(DateRangeContext)
    if (context === undefined) {
        throw new Error('useDateRange must be used within DateRangeProvider')
    }
    return context
}
