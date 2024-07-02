export const HEADER_HEADINGS = [
    { headingName: 'About', headingHref: '/' },
    { headingName: 'Pricing', headingHref: '/pricing' },
    { headingName: 'Services', headingHref: '/' },
    { headingName: 'Login', headingHref: '/login' },
    { headingName: 'Register', headingHref: '/register' },
];

interface MenuDataType {
    title: string;
    link: string;
    sub_menu?: MenuDataType[];
}

export const MenuData: MenuDataType[] = [
    {
        title: 'ABOUT',
        link: '/about',
    },
    {
        title: 'Pricing',
        link: '/pricing',
        // sub_menu: [
        //     {
        //         title: 'Overview',
        //         link: '/about#overview',
        //     },
        // ],
    },
    {
        title: 'Services',
        link: '/services',
    },
    {
        title: 'Login',
        link: '/login',
    },
    {
        title: 'Register',
        link: '/register',
    },
];