import { ChangeEvent, FormEvent, useState } from 'react'
import { CircularLoader } from '../../../components/loader/circular-loader.component'
import { Success } from '../../../components/success/success.component'
import { EditIcon } from '../icons'
import { updateUser } from '../services/api'

interface UserProps {
    name: string
    email: string
    image?: string
}

interface InputEditProps {
    name?: string
}

interface InputTypeProps {
    type: keyof InputEditProps
}

const INITIAL_FORM_STATE = {
    name: false,
}

export const ProfileEdit = ({ ...user }: UserProps) => {
    const [formState, setFormState] = useState(user)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isInputEditable, setIsInputEditable] = useState(INITIAL_FORM_STATE)
    const [showSuccess, setShowSuccess] = useState(false)

    const canSubmit = Boolean(isInputEditable.name) || isLoading || showSuccess

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsInputEditable(INITIAL_FORM_STATE)
        setIsLoading(true)
        // TODO Temporary only change of name is allowed
        const { name } = formState

        updateUser({ name })
            .then(() => {
                setIsLoading(false)
                setShowSuccess(true)
            })
            .catch(error => {
                throw error
            })
            .finally(() => {
                setTimeout(() => {
                    setShowSuccess(false)
                }, 1000)
            })
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: [e.target.value] })
    }

    const toggleInputEditable = ({ type }: InputTypeProps) => {
        setIsInputEditable({ ...isInputEditable, [type]: !isInputEditable[type] })
    }

    const submitButton = (
        <div className='flex items-center mt-4'>
            <button
                type='submit'
                className='bg-blue-600 max-w-fit p-2 rounded text-white text-sm disabled:bg-gray-500'
                disabled={isLoading || showSuccess}
            >
                Save Changes
            </button>
            {showSuccess ? <Success /> : isLoading ? <CircularLoader /> : null}
        </div>
    )

    return (
        <div className='flex flex-col items-start'>
            <p className='ml-1 mt-2 text-sm font-medium text-gray-600'>Profile</p>
            <form
                onSubmit={handleOnSubmit}
                className='mt-1 text-sm w-full'
            >
                <div className='grid grid-cols-2 gap-x-10 bg-tealdark p-4 rounded-md shadow-md'>
                    <div className='flex flex-col text-white'>
                        <div className='flex items-center justify-between mb-1'>
                            <label
                                htmlFor='name'
                                className='ml-1'
                            >
                                Name
                            </label>
                            <EditIcon
                                className='text-blue-400 w-4 h-4 cursor-pointer'
                                onClick={() => toggleInputEditable({ type: 'name' })}
                            />
                        </div>
                        <input
                            id='name'
                            name='name'
                            value={formState.name}
                            onChange={handleOnChange}
                            className={`p-2 rounded ${isInputEditable.name ? 'text-black' : ''}`}
                            disabled={!isInputEditable.name}
                        />
                    </div>
                    <div className='flex flex-col text-white'>
                        <label
                            htmlFor='email'
                            className='ml-1 mb-1'
                        >
                            Email
                        </label>
                        <input
                            id='email'
                            name='email'
                            value={formState.email}
                            onChange={handleOnChange}
                            className='p-2 rounded'
                            disabled
                        />
                    </div>
                </div>
                {canSubmit ? submitButton : null}
            </form>
        </div>
    )
}
