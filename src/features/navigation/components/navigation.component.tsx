import { Link } from '@tanstack/react-location'

// uselink hook for setting the default link props. also can be customizable
import { useLink } from '../hooks/use-link'

// sidenav links
import { navlinks, Navlink } from '../navlinks'

import { SideNav } from '../../../Layouts/SideNav'

import { User } from './user.component'
import { TextLogo } from '../../../components/text-logo/text-logo.component'
import { memo } from 'react'

export const nNavigation = () => {
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
            <div className='bg-bglight w-full border-r border-slate-200 py-8'>
                <TextLogo
                    size='medium'
                    name
                />
            </div>
            <User />
            {links}
        </SideNav>
    )
}

export const Navigation = memo(nNavigation)
