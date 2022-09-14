import { CircularLoader } from '../../../../components/loader/circular-loader.component'
import { ILoginProps } from './login.container'

export const Login = ({ ...props }: ILoginProps) => {
    const {
        formState,
        error,
        isLoading,
        showError,
        clearError,
        navigate,
        handleChange,
        handleLogin,
        handleFocus,
    } = props

    let errorMessage

    if (showError) {
        errorMessage = (
            <p className='text-red-600 dark:bg-transparent dark:border dark:border-red-600 dark:text-textDark1 text-center animate-slide-right h-fit bg-gray-100 w-20vw rounded py-4 px-8 last:text-sm font-semibold mt-4 md:absolute top-44 right-10'>
                {error?.message}
            </p>
        )
    }

    return (
        <div className='w-4/5 m-auto bg-white h-full relative dark:w-full dark:bg-bgDark dark:h-screen'>
            <div className='flex flex-col items-center justify-start py-24'>
                <p className='text-4xl font-bold drop-shadow-lg text-orange-600'>
                    P<span className='text-6xl'>€</span>T
                </p>
                <p className='text-sm text-gray-600 mt-3 dark:text-textDark2'>
                    Are you new ?
                    <span
                        className='font-bold text-orange-600 underline cursor-pointer ml-2'
                        onClick={() => {
                            clearError()
                            navigate({ to: '/register' })
                        }}
                    >
                        Register
                    </span>
                </p>
                <div
                    className='bg-tealdark dark:bg-hoverDark p-8 rounded-md shadow-md text-white z-10  my-2'
                    aria-label='login form'
                >
                    <p className='text-dark text-2xl text-center dark:text-orange-400'>Sign In</p>
                    <p className='text-green-300 text-md text-center mt-2 dark:text-textDark2'>
                        Please provide your credentials
                    </p>

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
                        <div className='flex items-center mt-6'>
                            <button
                                className='bg-orange-600 dark:bg-transparent dark:border dark:border-green-600 dark:hover:bg-green-600 w-fit py-2 disabled:bg-gray-200 disabled:text-gray-400 px-8 rounded shadow-xl dark:disabled:bg-transparent dark:disabled:border-borderDark'
                                aria-live='polite'
                                type='submit'
                                disabled={Boolean(showError) || isLoading}
                            >
                                Sign In
                            </button>
                            {isLoading ? (
                                <div className='ml-4'>
                                    <CircularLoader />
                                </div>
                            ) : null}
                        </div>
                    </form>
                </div>
            </div>
            {errorMessage}
        </div>
    )
}
