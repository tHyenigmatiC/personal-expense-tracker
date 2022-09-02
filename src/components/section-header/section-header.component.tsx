interface TitleProps {
    title: string
    detail?: string
}

export const SectionHeader = ({ title, detail }: TitleProps) => (
    <p className='text-start text-base text-gray-600 mb-1 capitalize'>
        {title}
        {detail ? <span className='text-xs text-gray-700 font-bold ml-1'>( {detail} )</span> : null}
    </p>
)
