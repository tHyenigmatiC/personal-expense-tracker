import { FormEvent, useState, ChangeEvent, useMemo } from 'react'
import { CircularLoader } from '../../../components/loader/circular-loader.component'
import { Success } from '../../../components/success/success.component'
import { updatePassword } from '../services/api'

const INTIAL_STATE = {
    password: '',
}

export const SecuritySettings = () => {
    const [formState, setFormState] = useState({
        password: '',
    })

    const [canEdit, setCanEdit] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showSuccess, setShowSuccess] = useState<boolean>(false)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        // updating password
        updatePassword(formState)
            .then(() => {
                setIsLoading(false)
                setShowSuccess(true)
            })
            .catch(error => {
                console.log(error)
                throw error
            })
            .finally(() => {
                setTimeout(() => {
                    setShowSuccess(false)
                    setCanEdit(false)
                }, 1000)
            })
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    let changeButton

    const actionButtons = useMemo(() => {
        if (canEdit) {
            return (
                <div className='flex flex-row items-center justify-start mt-5 gap-2'>
                    <button
                        type='submit'
                        className='min-w-fit p-2 rounded-md text-white w-24 bg-blue-600'
                    >
                        Save Changes
                    </button>
                    {showSuccess ? (
                        <Success />
                    ) : isLoading ? (
                        <CircularLoader />
                    ) : (
                        <button
                            type='button'
                            className='min-w-fit p-2 rounded-md text-white w-24 bg-red-600'
                            onClick={() => {
                                setCanEdit(!canEdit)
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            )
        } else {
            return null
        }
    }, [canEdit, isLoading, showSuccess])

    if (!canEdit) {
        changeButton = (
            <button
                type='button'
                className='min-w-fit rounded text-white text-sm bg-blue-600 px-4 capitalize'
                onClick={() => {
                    setCanEdit(true)
                    setFormState(INTIAL_STATE)
                }}
            >
                Change
            </button>
        )
    }

    return (
        <div className='flex flex-col items-start self-center mt-8'>
            <p className='ml-1 text-gray-600 text-sm font-medium'>Security</p>
            <form
                onSubmit={handleOnSubmit}
                className='mt-1 w-full text-sm'
            >
                <div className='flex flex-col shadow-md rounded bg-tealdark p-4'>
                    <label
                        htmlFor='password'
                        className='text-white font-medium ml-1 mb-1'
                    >
                        Password
                    </label>
                    <div className='flex flex-row justify-between w-full'>
                        <input
                            id='password'
                            type='password'
                            name='password'
                            value={formState.password}
                            placeholder='••••••'
                            onChange={handleOnChange}
                            className='p-2 rounded w-3/5 placeholder:text-white'
                            disabled={!canEdit}
                        />
                        {changeButton}
                    </div>
                </div>
                {actionButtons}
            </form>
        </div>
    )
}
