interface CardProps {
    amount: string
    type: string
    icon: string
}

export const CategoryCard = ({ type, amount, icon }: CardProps) => {
    return (
        <div className='flex flex-col items-center dark:bg-hoverDark dark:shadow-black dark:border-borderDark justify-center py-3 pl-4 pr-2 shadow border border-teal-100 bg-green-100 h-28 rounded-xl'>
            <img
                src={icon}
                className='w-12 h-12 mb-2'
            />
            <p className='text-sm font-medium text-tealdark dark:text-textDark3 capitalize'>
                {type}
            </p>
            <p className='font-bold text-orange-600'>
                <span className='text-base'>Rs </span>
                {parseInt(amount).toLocaleString('en-US')}
            </p>
        </div>
    )
}
