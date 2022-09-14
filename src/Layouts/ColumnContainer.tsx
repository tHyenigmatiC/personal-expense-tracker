interface ChildrenProps {
    children: React.ReactNode
}

export const ColumnContainer = ({ children }: ChildrenProps) => {
    return (
        <div className='flex flex-col items-center justify-start w-1/4 h-screen bg-tealight dark:bg-bgDark min-hs-screen py-6 px-2'>
            {children}
        </div>
    )
}
