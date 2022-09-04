interface CardProps {
    amount: string
    type: string
    icon: string
}

export const CategoryCard = ({ type, amount, icon }: CardProps) => {
    return (
        <div className='flex flex-col items-center justify-center py-2 pl-4 pr-2 shadow bg-tealdark h-28 rounded-xl'>
            <img
                src={icon}
                className='w-12 h-12 mb-4'
            />
            <p className='text-sm font-medium text-gray-400 capitalize'>{type}</p>
            <p className='font-bold text-white'>
                <span className='text-base'>Rs </span>
                {parseInt(amount).toLocaleString('en-US')}
            </p>
        </div>
    )
}
