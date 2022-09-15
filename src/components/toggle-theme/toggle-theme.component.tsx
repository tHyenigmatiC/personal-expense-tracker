import { useEffect, useRef, useState } from 'react'
import { Switch } from '../switch/switch.component'

export const ToggleTheme = () => {
    const [on, setOn] = useState(localStorage.theme === 'dark')

    const handleClick = () => {
        setOn(!on)
    }
    const firstLoad = useRef(true)

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false
            return
        }
        if (on) {
            document.documentElement.setAttribute('class', 'dark')
            localStorage.theme = 'dark'
            return
        }

        document.documentElement.removeAttribute('class')
        localStorage.theme = 'light'
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
