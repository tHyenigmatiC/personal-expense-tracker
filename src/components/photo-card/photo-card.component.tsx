interface ImageProps extends ImageSizeProps {
    image: string
}

interface ImageSizeProps {
    width?: string
    height?: string
}

export const PhotoCard = ({ width = 'w-24', height = 'h-24', image }: ImageProps) => {
    return (
        <div className={`${width} ${height} my-2`}>
            <img
                src={image}
                className='shadow-md rounded-full w-100'
            />
        </div>
    )
}
