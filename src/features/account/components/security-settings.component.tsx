import { FormEvent, useState, ChangeEvent, useRef, useMemo } from 'react'

import user from '../../../mock-data/user.json'

export const SecuritySettings = () => {
    const { password } = user
    const [formState, setFormState] = useState({
        password,
    })

    const passwordRef = useRef(formState.password)

    const [canEdit, setCanEdit] = useState(false)

    console.count('rendered')

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

    let editButton

    const actionButtons = useMemo(() => {
        if (canEdit) {
            return (
                <div className='flex flex-row items-center justify-start mt-5 gap-8'>
                    <button
                        type='submit'
                        className='min-w-fit p-2 rounded-md text-white w-24 bg-green-600'
                    >
                        Save Changes
                    </button>
                    <button
                        type='button'
                        className='min-w-fit p-2 rounded-md text-white w-24 bg-red-600'
                        onClick={() => setCanEdit(!canEdit)}
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
        editButton = (
            <button
                type='button'
                className='min-w-fit rounded-md text-white w-24 bg-blue-600'
                onClick={() => setCanEdit(prevState => !prevState)}
            >
                Edit
            </button>
        )
    }

    return (
        <div className='flex flex-col items-start self-center w-full px-36 mt-8'>
            <p className='ml-1 text-gray-500 font-medium'>Security</p>
            <form
                onSubmit={handleOnSubmit}
                className='mt-2 flex flex-col bg-tealdark p-4 rounded-md shadow-md w-full'
            >
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
                    {editButton}
                </div>
                {actionButtons}
            </form>
        </div>
    )
}
