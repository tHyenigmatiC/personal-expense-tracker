import { ChangeEvent, useMemo, useRef, useState } from 'react'
import { filterUpdatedValue } from '../../../utils/utils'

const INITIAL_MISC_SETTINGS = {
    monthlySubscription: true,
    testData: false,
}

export const MiscellaneousSettings = () => {
    const [updateState, setUpdateState] = useState(INITIAL_MISC_SETTINGS)

    const oldSettings = useRef(updateState)

    const { monthlySubscription } = updateState

    const handleCheckBoxClick = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateState({ ...updateState, [e.target.name]: e.target.checked })
    }

    const valuesChanged = filterUpdatedValue(updateState, oldSettings.current)

    const handleUpdateClick = () => {
        alert('value updated')
    }

    console.log(valuesChanged, Boolean(valuesChanged))

    let actionButton

    if (valuesChanged) {
        actionButton = (
            <button
                type='button'
                className='p-2 bg-blue-600 rounded shadow-md text-white'
                onClick={handleUpdateClick}
            >
                Save Changes
            </button>
        )
    }
    return (
        <div className='text-sm my-4'>
            <p className='text-gray-600 text-sm font-medium'>Miscellaneous</p>
            <div className='flex flex-row justify-between bg-tealdark text-white rounded shadow-md p-4 mt-1 mb-4'>
                <p>Generate montly report and email me</p>
                <input
                    name='monthlySubscription'
                    id='monthlySubscription'
                    type='checkbox'
                    defaultChecked={monthlySubscription}
                    onChange={handleCheckBoxClick}
                    className='w-4 h-4'
                />
            </div>
            {actionButton}
        </div>
    )
}
