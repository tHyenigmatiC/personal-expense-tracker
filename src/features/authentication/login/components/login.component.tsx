import { ChangeEventHandler, FormEventHandler, useState } from 'react'

import { useAuth } from '../../context/useAuth'

export const Login = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    })

    const { error, login, isLoading } = useAuth()

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleLogin: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()

        console.log(e)
    }

    return (
        <div className='w-full bg-white h-screen'>
            <div className='flex flex-col items-center justify-start my-24'>
                <p className='text-4xl font-bold drop-shadow-lg text-orange-600'>
                    P<span className='text-6xl'>€</span>T
                </p>
                <div
                    className='my-8 bg-tealdark p-8 rounded-md shadow-md text-white'
                    aria-live='polite'
                >
                    <p className='text-shadelight text-xl text-center'>
                        Login with your credentials
                    </p>
                    {isLoading ? (
                        'Logging...'
                    ) : (
                        <form
                            className='flex flex-col items-center justify-center mt-4'
                            onSubmit={handleLogin}
                        >
                            <div className='flex items-center mt-4'>
                                <label
                                    className='mr-4 w-16'
                                    htmlFor='email'
                                >
                                    Email
                                </label>
                                <input
                                    id='email'
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
                                    className='p-2 rounded text-black'
                                    type='password'
                                    placeholder='******'
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                className='bg-orange-600 w-fit mt-8 py-2 px-8 rounded shadow-xl'
                                aria-live='polite'
                                type='submit'
                            >
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
