import { Link } from '@tanstack/react-location'

// uselink hook for setting the default link props. also can be customizable
import { useLink } from '../hooks/use-link'

// sidenav links
import { navlinks, Navlink } from '../navlinks'

import { SideNav } from '../../../Layouts/SideNav'

import { User } from './user.component'
import { TextLogo } from '../../../components/text-logo/text-logo.component'

export const Navigation = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { getLinkProps }: any = useLink()

    const links = (
        <>
            {navlinks.map(({ text, link, icon }: Navlink) => {
                return (
                    <Link
                        {...getLinkProps({ text, to: link })}
                        key={link}
                    >
                        {icon}
                        <p className='text-sm font-sans'>{text}</p>
                    </Link>
                )
            })}
        </>
    )
    return (
        <SideNav>
            <TextLogo
                size='small'
                name
            />
            <User />
            {links}
        </SideNav>
    )
}
