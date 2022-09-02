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
        <div className='w-20 h-20 my-2'>
            <img
                src={image}
                className='shadow-md rounded-3xl w-100'
            />
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const User = () => {
    const { name, image, email }: User = user
    return (
        <div className='flex flex-col items-center justify-center mb-12'>
            <ImageCard image={image} />
            <p className='font-serif text-black font-medium'>{name}</p>
            <p className='font-serif text-gray-500 text-xs'>{email}</p>
        </div>
    )
}
