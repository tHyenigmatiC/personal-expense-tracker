interface ChildrenProps {
    children: React.ReactNode
}

export const ColumnContainer = ({ children }: ChildrenProps) => {
    return (
        <div className='flex flex-col items-center justify-start w-1/5 h-screen bg-white min-hs-screen py-6'>
            {children}
        </div>
    )
}
