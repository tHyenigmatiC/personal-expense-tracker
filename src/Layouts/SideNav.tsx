import { AuxProps } from './PageContainer'

export const SideNav = ({ children }: AuxProps) => {
    return (
        <div className='flex flex-col items-center w-1/5 h-screen bg-teal-800 dark:bg-bgDark dark:border-r dark:border-borderDark'>
            {children}
        </div>
    )
}
