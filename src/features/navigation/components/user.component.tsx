import user from '../user.json'

interface ImageProps {
    image: string
}

interface User {
    name: string
    email: string
    image: string
    username: string
}

export const ImageCard = ({ image }: ImageProps) => {
    return (
        <div className='w-32 h-32 my-2'>
            <img
                src={image}
                className='shadow-md rounded-3xl w-100'
            />
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const User = () => {
    const { name, image }: User = user
    return (
        <div className='flex flex-col items-center justify-center mb-6'>
            <ImageCard image={image} />
            <p className='font-serif text-xl text-white'>{name}</p>
        </div>
    )
}
