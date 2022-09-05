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
            className='bg-blue-600 max-w-fit p-2 rounded text-white text-sm mt-4'
        >
            Save Changes
        </button>
    )

    return (
        <div className='flex flex-col items-start'>
            <p className='ml-1 mt-2 text-sm font-medium text-gray-600'>Profile</p>
            <form
                onSubmit={handleOnSubmit}
                className='mt-1 text-sm w-full'
            >
                <div className='grid grid-cols-2 gap-x-10 bg-tealdark p-4 rounded-md shadow-md'>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-between mb-1'>
                            <label
                                htmlFor='name'
                                className='ml-1 text-white'
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
                            className='p-2 rounded'
                            disabled={!isInputEditable.name}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-start justify-between mb-1'>
                            <label
                                htmlFor='email'
                                className='ml-1 text-white'
                            >
                                Email
                            </label>
                            <EditIcon
                                className='text-blue-400 w-4 h-4 cursor-pointer'
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
                </div>
                {canSubmit ? submitButton : null}
            </form>
        </div>
    )
}
