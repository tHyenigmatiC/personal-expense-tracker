// import FooterNav from '../features/footernav'
export interface AuxProps {
    title?: string
    children: React.ReactNode
}

export const PageContainer = ({ title, children }: AuxProps) => {
    let pageTitle

    if (title) {
        pageTitle = (
            <p
                className='mb-6 text-2xl font-extrabold text-tealdark'
                aria-label='title'
            >
                {title}
            </p>
        )
    }
    return (
        <div className='relative flex flex-col items-center w-3/5 h-screen min-h-screen pt-8 pb-6 bg-teallight'>
            {pageTitle}
            {children}
            {/* <FooterNav /> */}
        </div>
    )
}
