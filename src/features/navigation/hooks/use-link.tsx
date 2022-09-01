interface LinkProps {
    text: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any
}

// Props getter pattern
// All the common props required for the link will be declared here
// as if we want to pass the custom props we can do that also using getLinkProps
export const useLink = () => {
    const className =
        'flex flex-row items-center w-5/6 px-2 py-1 text-white hover:bg-purple-700 hover:scale-110'

    const getLinkProps = ({ text, ...props }: LinkProps) => {
        return {
            className,
            'aria-label': text,
            text: null,
            ...props,
        }
    }

    const getLinkIconProps = ({ text, ...props }: LinkProps) => {
        return {
            className: 'p-1',
            'aria-label': text,
            ...props,
        }
    }

    return {
        className,
        getLinkProps,
        getLinkIconProps,
    }
}
