import { Link } from '@tanstack/react-location';

// uselink hook for setting the default link props. also can be customizable
import { useLink } from '../hooks/use-link';

// sidenav links
import { navlinks, Navlink } from '../navlinks';

export const Navigation = () => {
    const { getLinkProps, getLinkIconProps }: any = useLink();

    const links = (
        <>
            {navlinks.map(({ text, link, icon }: Navlink) => {
                return (
                    <Link {...getLinkProps({ text, to: link, key: link })}>
                        <img
                            {...getLinkIconProps({
                                text: 'logo',
                                src: icon,
                                height: 64,
                                width: 64
                            })}
                        />
                    </Link>
                );
            })}
        </>
    );
    return <div className="flex">{links}</div>;
};
