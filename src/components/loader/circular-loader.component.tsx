interface ICircularLoader {
    width?: string
    height?: string
    color?: string
    borderWidth?: string
}
export const CircularLoader = ({
    width = 'w-9',
    height = 'h-9',
    color = 'border-orange-600',
    borderWidth = 'border-3',
}: ICircularLoader) => {
    const classes = `${width} ${height} ${color} ${borderWidth}`
    return (
        <div
            className={`${classes} animate-spin border-r-transparent border-b-transparent rounded-full mx-3`}
        />
    )
}
