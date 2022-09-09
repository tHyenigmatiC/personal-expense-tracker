interface ILogo {
    size?: string
    name?: boolean
}

export const TextLogo = ({ size = 'medium', name = false }: ILogo) => {
    const textSize =
        size === 'small'
            ? ['text-xl', 'text-3xl']
            : size === 'medium'
            ? ['text-3xl', 'text-5xl']
            : ['text-4xl', 'text-6xl']
    return (
        <div className='text-center mt-1 mb-3'>
            <p className={'font-bold drop-shadow-lg text-orange-600 ' + textSize[0]}>
                P<span className={textSize[1]}>€</span>T
            </p>
            {name ? <p className='text-orange-600 text-sm'>Personal Expense Tracker</p> : null}
        </div>
    )
}
