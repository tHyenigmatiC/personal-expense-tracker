import { AuxProps } from './PageContainer'

export const SideNav = ({ children }: AuxProps) => {
    return <div className='flex flex-col items-center w-1/5 h-screen p-4 bg-white'>{children}</div>
}
