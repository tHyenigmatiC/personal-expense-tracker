import { FormEvent, useState } from 'react'

import { supabase } from '../../../../db/supabaseClient'

export const Register = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            // as typescript default the error object to unknown
            // this is how we can tell typescript that we are
            // also unaware about the type of error. but hey let
            // come to compromise. I will check if the error is instance of Error
            // if then I will just get the message object
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)

            alert(message)
        } finally {
            setLoading(false)
        }
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
                    <p className='text-white'>Sign in via magic link with your email below</p>
                    {loading ? (
                        'Sending magic link...'
                    ) : (
                        <form
                            className='flex flex-col items-center'
                            onSubmit={handleLogin}
                        >
                            <div className='block mt-4'>
                                <label
                                    className='mr-4'
                                    htmlFor='email'
                                >
                                    Email
                                </label>
                                <input
                                    id='email'
                                    className='p-2 rounded text-black'
                                    type='email'
                                    placeholder='email@address.com'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                className='bg-orange-600 w-fit mt-8 p-2 rounded'
                                aria-live='polite'
                                type='submit'
                            >
                                Send magic link
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
