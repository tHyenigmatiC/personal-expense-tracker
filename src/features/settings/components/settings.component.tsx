import { PageContainer } from '../../../Layouts/PageContainer'
import { AppearanceSettings } from './appearance.compnent'
import { MiscellaneousSettings } from './miscellaneous.component'

export const Settings = () => {
    return (
        <PageContainer>
            <div className='w-full px-32'>
                <AppearanceSettings />
                <MiscellaneousSettings />
                <button
                    type='button'
                    className='text-white mx-auto rounded shadow-md bg-red-600 p-2 mt-8'
                >
                    Logout
                </button>
            </div>
        </PageContainer>
    )
}
