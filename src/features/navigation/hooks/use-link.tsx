interface LinkProps {
    text: string;
    props: any;
}

// Props getter pattern
// All the common props required for the link will be declared here
// as if we want to pass the custom props we can do that also using getLinkProps
export const useLink = () => {
    const className = 'flex flex-row p-4 m-4';

    const getLinkProps = ({ text, ...props }: LinkProps) => {
        return {
            className,
            'aria-label': text,
            text,
            ...props
        };
    };

    const getLinkIconProps = ({ text, ...props }: LinkProps) => {
        return {
            className: 'p-2',
            'aria-label': text,
            ...props
        };
    };

    return {
        className,
        getLinkProps,
        getLinkIconProps
    };
};
