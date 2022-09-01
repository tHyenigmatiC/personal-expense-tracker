import { AuxProps } from './PageContainer'

export const Footer = ({ children }: AuxProps) => {
    return (
        <div className='absolute bottom-0 flex justify-center w-full py-3 bg-purple-700'>
            {children}
        </div>
    )
}
