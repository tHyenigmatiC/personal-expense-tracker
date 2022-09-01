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
                height={24}
                width={24}
            />
        )
    }
    return (
        <div className='flex flex-col items-center p-4 bg-white shadow-xl rounded-xl'>
            {Icon}
            <p className='text-base'>Rs {parseInt(amount).toLocaleString('en-US')}</p>
            {type ? <p className='text-sm text-purple-600 capitalize'>{type}</p> : null}
        </div>
    )
}
