// import FooterNav from '../features/footernav'
export interface AuxProps {
    title?: string
    children: React.ReactNode
    classprops?: string
}

export const PageContainer = ({ title, children, classprops }: AuxProps) => {
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
        <div {...getContainerClassProps(classprops)}>
            {pageTitle}
            {children}
            {/* <FooterNav /> */}
        </div>
    )
}

const getContainerClassProps = (classprops = 'overflow-y-hidden') => {
    return {
        className: `relative flex flex-col items-center w-3/5 h-screen min-h-screen pt-8 pb-6 bg-white border-slate-300 dark:border-borderDark border-r dark:bg-bgDark ${classprops}`,
    }
}
