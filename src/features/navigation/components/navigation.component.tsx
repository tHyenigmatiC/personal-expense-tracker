import { Link } from '@tanstack/react-location'

// uselink hook for setting the default link props. also can be customizable
import { useLink } from '../hooks/use-link'

// sidenav links
import { navlinks, Navlink } from '../navlinks'

import { SideNav } from '../../../Layouts/SideNav'

import { User } from './user.component'

export const Navigation = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { getLinkProps, getLinkIconProps }: any = useLink()

    const links = (
        <>
            {navlinks.map(({ text, link, icon }: Navlink) => {
                return (
                    <Link
                        {...getLinkProps({ text, to: link })}
                        key={link}
                    >
                        <img
                            {...getLinkIconProps({
                                text: 'logo',
                                src: icon,
                                height: 64,
                                width: 64,
                            })}
                        />
                        <p>{text}</p>
                    </Link>
                )
            })}
        </>
    )
    return (
        <SideNav>
            <User />
            {links}
        </SideNav>
    )
}
