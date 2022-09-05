import { FormEvent, useState, ChangeEvent, useRef, useMemo } from 'react'

import user from '../../../mock-data/user.json'

const INTIAL_STATE = {
    password: '',
}

export const SecuritySettings = () => {
    const { password } = user
    const [formState, setFormState] = useState({
        password,
    })

    const passwordRef = useRef(formState.password)

    const [canEdit, setCanEdit] = useState(false)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (passwordRef.current == formState.password) {
            alert('same password')
            return
        }
        alert('password updated')
        passwordRef.current = formState.password
        setCanEdit(false)
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    let changeButton

    const actionButtons = useMemo(() => {
        if (canEdit) {
            return (
                <div className='flex flex-row items-center justify-start mt-5 gap-8'>
                    <button
                        type='submit'
                        className='min-w-fit p-2 rounded-md text-white w-24 bg-blue-600'
                    >
                        Save Changes
                    </button>
                    <button
                        type='button'
                        className='min-w-fit p-2 rounded-md text-white w-24 bg-red-600'
                        onClick={() => {
                            setCanEdit(!canEdit)
                            setFormState({ ...formState, password: passwordRef.current })
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )
        } else {
            return null
        }
    }, [canEdit, setCanEdit])

    if (!canEdit) {
        changeButton = (
            <button
                type='button'
                className='min-w-fit rounded text-white text-sm bg-blue-600 px-4 capitalize'
                onClick={() => {
                    setCanEdit(prevState => !prevState)
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
                            onChange={handleOnChange}
                            className='p-2 rounded w-3/5'
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
