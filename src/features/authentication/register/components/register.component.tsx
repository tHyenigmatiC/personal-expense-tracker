import { IRegisterProps } from './register.container'

// This component file just returns the view without much logical handling

export const Register = ({ ...props }: IRegisterProps) => {
    const {
        formState,
        isLoading,
        handleChange,
        handleRegister,
        handleFocus,
        showError,
        clearError,
        error,
        success,
        navigate,
    } = props

    let errorMessage

    if (showError) {
        errorMessage = (
            <p className='text-red-600 text-center animate-slide-right h-fit bg-gray-100 rounded px-8 py-4 w-20vw text-sm font-semibold mt-4 md:absolute top-24 right-10'>
                {error?.message}
            </p>
        )
    }

    const successMessage = (
        <div className='bg-teallight p-5 my-4 rounded text-center w-30vw'>
            <p className='text-green-600 text-xl font-semibold'>Account Created Successfully</p>
            <p className='text-gray-700 text-sm my-1'>
                An email has been sent for verfication.
                <br /> Please verify it to continue.
            </p>
        </div>
    )

    const loadingMessage = (
        <p className='text-center bg-orange-600 text-lg text-white px-1 py-1 my-2 rounded'>
            Creating your account...
        </p>
    )

    return (
        <div className='w-4/5 m-auto bg-white h-full relative'>
            <div className='flex flex-col items-center justify-start my-16'>
                <p className='text-4xl font-bold drop-shadow-lg text-orange-600'>
                    P<span className='text-6xl'>€</span>T
                </p>
                <p className='text-sm text-gray-600 mt-3'>
                    Already have an account ?
                    <span
                        className='font-bold text-orange-600 underline cursor-pointer ml-2'
                        onClick={() => {
                            clearError()
                            navigate({ to: '/login' })
                        }}
                    >
                        Login
                    </span>
                </p>
                <div
                    className='bg-tealdark p-8 rounded-md shadow-md text-white mt-2 z-10'
                    aria-label='registration form'
                >
                    <p className='text-dark text-2xl text-center'>Sign Up</p>
                    <p className='text-green-300 text-md text-center mt-2'>
                        We are eager to help your with your expense tracking
                    </p>
                    {isLoading ? (
                        loadingMessage
                    ) : success ? (
                        successMessage
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
                                    onFocus={handleFocus}
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
                                    onFocus={handleFocus}
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
                                    onFocus={handleFocus}
                                />
                            </div>
                            <button
                                className='bg-orange-600 w-fit mt-8 py-2 px-8 disabled:bg-gray-200 disabled:text-gray-400 rounded shadow-xl'
                                aria-live='polite'
                                type='submit'
                                disabled={Boolean(showError)}
                            >
                                Sign Up
                            </button>
                        </form>
                    )}
                </div>
            </div>
            {errorMessage}
        </div>
    )
}
