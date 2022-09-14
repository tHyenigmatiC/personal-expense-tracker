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
        'group flex flex-row items-center rounded-lg w-5/6 p-2 text-teallight dark:bg-transparent dark:hover:border dark:hover:border-orange-600  dark:text-textDark3 dark:hover:text-textDark1 hover:scale-110 hover:bg-teallight hover:text-tealdark'

    const getLinkProps = ({ text, ...props }: LinkProps) => {
        return {
            className,
            'aria-label': text,
            text: null,
            ...props,
        }
    }

    return {
        className,
        getLinkProps,
    }
}
