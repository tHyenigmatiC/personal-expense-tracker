interface CardProps {
    icon?: React.ReactNode
    amount: string
    type?: string
    month?: string
}

export const ExpenseCard = ({ type, amount, icon }: CardProps) => {
    return (
        <div className='flex flex-row items-center px-2 py-5 border border-teal-100 bg-green-100 shadow rounded'>
            {icon ? icon : null}
            <div className='flex flex-col items-center'>
                <p className='text-lg'>
                    <span className='text-base'>Rs </span>
                    {parseInt(amount).toLocaleString('en-US')}
                </p>
                {type ? <p {...getCardClassProps(type)}>{type}</p> : null}
            </div>
        </div>
    )
}

const getCardClassProps = (type: string) => {
    if (type === 'expenditure') return { className: 'mt-1 text-sm text-red-600 uppercase' }
    if (type === 'remaining') return { className: 'mt-1 text-sm text-tealdark uppercase' }
    return { className: 'mt-1 text-sm text-blue-600 uppercase' }
}
