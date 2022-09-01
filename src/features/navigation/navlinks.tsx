import logo from '../../logo.svg';

export interface Navlink {
    text: string;
    link: string;
    icon: string;
}

export const navlinks: Navlink[] = [
    {
        text: 'Dashboard',
        link: '/',
        icon: logo
    },
    {
        text: 'Account',
        link: '/account',
        icon: logo
    },
    {
        text: 'Settings',
        link: '/settings',
        icon: logo
    }
];
