import { ChangeEventHandler, FormEventHandler, useState } from 'react'

import { useAuth } from '../../context/useAuth'

export const Register = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        name: '',
    })

    const { error, register, isLoading } = useAuth()

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleRegister: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        register(formState)
    }

    let errorMessage

    if (error) {
        errorMessage = (
            <p className='text-red-600 bg-teallight rounded p-1 text-sm font-semibold mt-4'>
                {error.message}
            </p>
        )
    }

    return (
        <div className='w-full bg-white h-screen'>
            <div className='flex flex-col items-center justify-start my-20'>
                <p className='text-4xl font-bold drop-shadow-lg text-orange-600'>
                    P<span className='text-6xl'>€</span>T
                </p>
                <div
                    className='my-8 bg-tealdark p-8 rounded-md shadow-md text-white'
                    aria-live='polite'
                >
                    <p className='text-dark text-2xl text-center'>Personal Expense Tracker</p>
                    <p className='text-orange-300 text-md text-center mt-2'>
                        We are eager to help your with your expense tracking
                    </p>
                    {isLoading ? (
                        'Logging...'
                    ) : (
                        <form
                            className='flex flex-col items-center justify-center mt-4'
                            onSubmit={handleRegister}
                        >
                            <div className='flex items-center mt-4'>
                                <label
                                    className='mr-4 w-16'
                                    htmlFor='name'
                                >
                                    Name
                                </label>
                                <input
                                    id='name'
                                    name='name'
                                    className='p-2 rounded text-black'
                                    type='text'
                                    placeholder='Full Name'
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex items-center mt-4'>
                                <label
                                    className='mr-4 w-16'
                                    htmlFor='email'
                                >
                                    Email
                                </label>
                                <input
                                    id='email'
                                    name='email'
                                    className='p-2 rounded text-black'
                                    type='email'
                                    placeholder='email@address.com'
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex items-center mt-4'>
                                <label
                                    className='mr-4 w-16'
                                    htmlFor='password'
                                >
                                    Password
                                </label>
                                <input
                                    id='password'
                                    name='password'
                                    className='p-2 rounded text-black'
                                    type='password'
                                    placeholder='******'
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {errorMessage}
                            <button
                                className='bg-orange-600 w-fit mt-8 py-2 px-8 rounded shadow-xl'
                                aria-live='polite'
                                type='submit'
                            >
                                Register
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
