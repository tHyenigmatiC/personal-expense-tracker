interface CardProps {
    amount: string
    type: string
    icon: string
}

export const CategoryCard = ({ type, amount, icon }: CardProps) => {
    return (
        <div className='flex bg-cardbg h-28 flex-col items-center justify-center py-2 pr-2 pl-4 shadow rounded-xl'>
            <img
                src={icon}
                className='w-12 h-12 mb-4'
            />
            <p className='capitalize text-sm text-gray-400 font-medium'>{type}</p>
            <p className='font-bold text-gray-700'>
                <span className='text-base'>Rs </span>
                {parseInt(amount).toLocaleString('en-US')}
            </p>
        </div>
    )
}
