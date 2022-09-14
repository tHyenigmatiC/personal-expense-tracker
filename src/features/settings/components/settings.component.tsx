import { useEffect, useState } from 'react'
import { CircularLoader } from '../../../components/loader/circular-loader.component'
import { supabase } from '../../../db/supabaseClient'
import { PageContainer } from '../../../Layouts/PageContainer'
import { AppearanceSettings } from './appearance.compnent'
import { MiscellaneousSettings } from './miscellaneous.component'

export const Settings = () => {
    const [logginOut, setLogginOut] = useState<boolean>(false)

    /* 
    currenlty when the user click log out
    the following actions are performed
     1. animate logout button and hide
     2. add event handlers to disable mouse clicks on page and hide mouse cursor until logged out
     3. show logout message with animation
     4. logout from website
     5. redirec to login page
     6. remove all event handlers
    */

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
        }
        if (logginOut) {
            document.addEventListener('click', handler, true)
        }

        return () => {
            document.removeEventListener('click', handler, true)
        }
    }, [logginOut])

    const handleLogOut = async () => {
        setLogginOut(true)
        await supabase.auth.signOut()
        setTimeout(() => {
            setLogginOut(false)
        }, 200)
    }

    return (
        <PageContainer>
            <div className='w-full px-32'>
                <AppearanceSettings />
                <MiscellaneousSettings />
                <div className='flex items-center justify-start mt-8'>
                    <button
                        type='button'
                        className='text-white scale rounded shadow-md dark:hover:bg-red-600 dark:hover:text-textDark1 bg-red-600 dark:bg-transparent py-2 px-4 dark:text-textDark3 dark:border-red-600 dark:border dark:rounded disabled:bg-gray-300 disabled:text-gray-700'
                        onClick={handleLogOut}
                        disabled={logginOut}
                    >
                        Logout
                    </button>
                    {logginOut ? <CircularLoader /> : null}
                </div>
            </div>
        </PageContainer>
    )
}
