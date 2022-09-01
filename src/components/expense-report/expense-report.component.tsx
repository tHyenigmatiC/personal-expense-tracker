// expense card
import { ExpenseCard } from '../expense-card/expense-card.compnent'

// mock data
import EXPENSE_REPORT_DATA from '../../mock-data/expense-report.json'

interface IObjectKeys {
    [key: string]: string
}

interface ExpData extends IObjectKeys {
    month: string
    income: string
    expenditure: string
    remaining: string
    image: string
}

export const ExpenseReport = () => {
    const { month, image, ...otherData }: ExpData = EXPENSE_REPORT_DATA
    const types = Object.keys(otherData)
    return (
        <div className='flex flex-col w-full px-6'>
            <p className='text-2xl text-start text-shadedark'>{month} 2022</p>
            <div className='grid w-9/12 grid-cols-3 gap-16 mt-6'>
                {types.map((type: string) => {
                    return (
                        <ExpenseCard
                            type={type}
                            amount={otherData[type]}
                            icon={image}
                            key={type}
                        />
                    )
                })}
            </div>
        </div>
    )
}
