interface CardProps {
    icon?: string
    amount: string
    type?: string
    month?: string
}

export const ExpenseCard = ({ type, amount, icon }: CardProps) => {
    let Icon

    if (icon) {
        Icon = (
            <img
                src={icon}
                height={36}
                width={36}
                className='mx-3'
            />
        )
    }
    return (
        <div className='flex flex-row items-center px-2 py-5 bg-white shadow rounded-xl'>
            {Icon}
            <div className='flex flex-col items-center'>
                <p className='font-medium text-lg'>
                    <span className='text-base'>Rs </span>
                    {parseInt(amount).toLocaleString('en-US')}
                </p>
                {type ? (
                    <p className='text-xs mt-1 text-gray-400 uppercase font-medium'>{type}</p>
                ) : null}
            </div>
        </div>
    )
}
