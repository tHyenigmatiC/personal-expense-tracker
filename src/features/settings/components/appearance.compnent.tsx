import { ToggleTheme } from '../../../components/toggle-theme/toggle-theme.component'

export const AppearanceSettings = () => {
    return (
        <div className='flex flex-col'>
            <p className='text-gray-600 dark:text-textDark2 text-sm font-medium'>Appearance</p>
            <div className='flex flex-col p-3 mt-1 bg-tealdark dark:bg-hoverDark items-start text-white dark:text-textDark1 rounded shadow-md'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <p>Theme</p>
                    <ToggleTheme />
                </div>
            </div>
        </div>
    )
}
