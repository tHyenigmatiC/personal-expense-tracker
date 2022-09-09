import { useEffect, useState } from 'react'
import { supabase } from '../../../db/supabaseClient'
import { PageContainer } from '../../../Layouts/PageContainer'
import { AppearanceSettings } from './appearance.compnent'
import { MiscellaneousSettings } from './miscellaneous.component'

export const Settings = () => {
    const [logginOut, setLogginOut] = useState<boolean>(false)
    const [showMessage, setShowMessage] = useState<boolean>(false)

    // currenlty when the user click log out
    // the following actions are performed
    //  1. animate logout button and hide
    //  2. add event handlers to disable mouse clicks on page and hide mouse cursor until logged out
    //  3. show logout message with animation
    //  4. logout from website
    //  5. redirec to login page
    //  6. remove all event handlers
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
        }
        if (logginOut) {
            document.addEventListener('click', handler, true)
            document.body.requestPointerLock()
        }

        return () => {
            document.removeEventListener('click', handler, true)
            document.exitPointerLock()
        }
    }, [logginOut])

    const handleLogOut = () => {
        setLogginOut(true)
        supabase.auth.signOut()
        setTimeout(() => {
            setShowMessage(true)
        }, 400)
    }

    return (
        <PageContainer>
            <div className='w-full px-32'>
                <AppearanceSettings />
                <MiscellaneousSettings />
                {logginOut && showMessage ? (
                    <p className='bg-red-600 text-xl w-fit py-4 px-6 mt-4 rounded shadow text-white font-semibold'>
                        Logging out...
                    </p>
                ) : (
                    <button
                        type='button'
                        className={`text-white scale mx-auto rounded shadow-md bg-red-600 py-2 px-4 mt-4${
                            logginOut ? ' animate-disappear' : ''
                        }`}
                        onClick={handleLogOut}
                    >
                        Logout
                    </button>
                )}
            </div>
        </PageContainer>
    )
}
