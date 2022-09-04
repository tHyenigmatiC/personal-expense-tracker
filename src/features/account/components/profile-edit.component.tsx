import { ChangeEvent, FormEvent, useState } from 'react'
import { EditIcon } from '../icons'

interface UserProps {
    name: string
    email: string
    image?: string
}

interface InputEditProps {
    name?: string
    email?: string
}

interface InputTypeProps {
    type: keyof InputEditProps
}

const INITIAL_FORM_STATE = {
    name: false,
    email: false,
}

export const ProfileEdit = ({ ...user }: UserProps) => {
    const [formState, setFormState] = useState(user)

    const [isInputEditable, setIsInputEditable] = useState(INITIAL_FORM_STATE)

    const canSubmit = Boolean(isInputEditable.email) || Boolean(isInputEditable.name)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert('profile udpated')
        setIsInputEditable(INITIAL_FORM_STATE)
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: [e.target.value] })
    }

    const toggleInputEditable = ({ type }: InputTypeProps) => {
        setIsInputEditable({ ...isInputEditable, [type]: !isInputEditable[type] })
    }

    const submitButton = (
        <button
            type='submit'
            className='bg-blue-600 max-w-fit p-2 rounded-md text-white font-medium mt-4'
        >
            Save Changes
        </button>
    )

    return (
        <div className='flex flex-col items-start w-full px-36'>
            <p className='ml-1 mt-2 font-medium text-gray-500'>Profile</p>
            <form
                onSubmit={handleOnSubmit}
                className='mt-2'
            >
                <div className='grid grid-cols-2 gap-x-10 bg-tealdark p-4 rounded-md shadow-md'>
                    <div className='flex flex-col'>
                        <div className='flex items-start justify-start'>
                            <label
                                htmlFor='name'
                                className='ml-1 mb-1 font-medium text-white'
                            >
                                Name
                            </label>
                            <EditIcon
                                className='text-blue-400 w-5 h-5 ml-2 cursor-pointer'
                                onClick={() => toggleInputEditable({ type: 'name' })}
                            />
                        </div>
                        <input
                            id='name'
                            name='name'
                            value={formState.name}
                            onChange={handleOnChange}
                            className='p-2 rounded'
                            disabled={!isInputEditable.name}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-start justify-start'>
                            <label
                                htmlFor='email'
                                className='ml-1 mb-1 font-medium text-white'
                            >
                                Email
                            </label>
                            <EditIcon
                                className='text-blue-400 w-5 h-5 ml-2 cursor-pointer'
                                onClick={() => toggleInputEditable({ type: 'email' })}
                            />
                        </div>
                        <input
                            id='email'
                            name='email'
                            value={formState.email}
                            onChange={handleOnChange}
                            className='p-2 rounded'
                            disabled={!isInputEditable.email}
                        />
                    </div>
                    {canSubmit ? submitButton : null}
                </div>
            </form>
        </div>
    )
}
