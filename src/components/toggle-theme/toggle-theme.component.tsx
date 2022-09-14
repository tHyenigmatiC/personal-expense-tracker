import { useEffect, useState } from 'react'
import { Switch } from '../switch/switch.component'

export const ToggleTheme = () => {
    const [on, setOn] = useState(false)

    const handleClick = () => {
        setOn(!on)
    }

    useEffect(() => {
        on
            ? document.documentElement.setAttribute('class', 'dark')
            : document.documentElement.removeAttribute('class')
    }, [on])
    return (
        <div className='flex flex-row'>
            <p className='mr-3'>Dark</p>
            <Switch
                on={on}
                onClick={handleClick}
                ariaLabel='toggle switch'
            />
            <p className='ml-3'>Normal</p>
        </div>
    )
}
