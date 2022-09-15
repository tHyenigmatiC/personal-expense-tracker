interface CardProps {
    icon?: React.ReactNode
    amount: string
    type?: string
    month?: string
}

export const ExpenseCard = ({ type, amount, icon }: CardProps) => {
    return (
        <div className='flex flex-row items-center px-2 py-5 border dark:bg-hoverDark dark:shadow-black dark:border-borderDark border-teal-100 bg-green-100 shadow drop-shadow rounded'>
            {icon ? icon : null}
            <div className='flex flex-col items-center'>
                <p className='text-lg dark:text-textDark2'>
                    <span className='text-base'>Rs </span>
                    {parseInt(amount).toLocaleString('en-US')}
                </p>
                {type ? <p {...getCardClassProps(type)}>{type}</p> : null}
            </div>
        </div>
    )
}

const getCardClassProps = (type: string) => {
    if (type === 'expenditure')
        return { className: 'mt-1 text-sm text-red-600 dark:text-red-400 uppercase' }
    if (type === 'remaining')
        return { className: 'mt-1 text-sm text-tealdark dark:text-teal-400 uppercase' }
    return { className: 'mt-1 text-sm text-blue-600 dark:text-blue-400 uppercase' }
}
