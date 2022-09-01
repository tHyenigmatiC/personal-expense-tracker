// import FooterNav from '../features/footernav'
export interface AuxProps {
    title?: string
    children: React.ReactNode
}

export const PageContainer = ({ title, children }: AuxProps) => {
    return (
        <div className='relative flex flex-col items-center w-4/6 h-screen min-h-screen py-6 bg-bglight'>
            <p
                className='mb-6 text-2xl font-extrabold text-shadelight'
                aria-label='title'
            >
                {title ?? 'Personal Expense Tracker'}
            </p>
            {children}
            {/* <FooterNav /> */}
        </div>
    )
}
