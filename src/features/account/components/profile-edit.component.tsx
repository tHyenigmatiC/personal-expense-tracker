import { ChangeEvent, FormEvent, useState } from 'react'

interface UserProps {
    name: string
    email: string
    image?: string
}

export const ProfileEdit = ({ ...user }: UserProps) => {
    const [formState, setFormState] = useState(user)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert('profile udpated')
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: [e.target.value] })
    }

    return (
        <form
            onSubmit={handleOnSubmit}
            className='mt-4'
        >
            <div className='grid grid-cols-2 gap-x-10'>
                <div className='flex flex-col'>
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        name='name'
                        value={formState.name}
                        onChange={handleOnChange}
                        className='p-2 rounded'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        value={formState.email}
                        onChange={handleOnChange}
                    />
                </div>
            </div>
        </form>
    )
}
