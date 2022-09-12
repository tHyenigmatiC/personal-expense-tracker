import { DashboardIcon, AccountIcon, SettingsIcon, ListIcon } from './icons'

export interface Navlink {
    text: string
    link: string
    icon: JSX.Element
}

const getIconProps = (text: string) => {
    return {
        className: 'p-1 mr-4 group-hover:fill-tealdark w-8 h-8',
        'aria-label': text,
    }
}

export const navlinks: Navlink[] = [
    {
        text: 'Dashboard',
        link: '/',
        icon: <DashboardIcon {...getIconProps('Dashboard')} />,
    },
    {
        text: 'Expense List',
        link: '/expenses',
        icon: <ListIcon {...getIconProps('Expenses')} />,
    },
    {
        text: 'Account',
        link: '/account',
        icon: <AccountIcon {...getIconProps('Account')} />,
    },
    {
        text: 'Settings',
        link: '/settings',
        icon: <SettingsIcon {...getIconProps('Settings')} />,
    },
]
