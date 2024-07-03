interface MenuDataType {
    title: string;
    link: string;
    sub_menu?: MenuDataType[];
}

type FaqItemType = {
    question: string;
    answer: string;
};

type FaqsDataType = {
    [key: string]: FaqItemType;
};


export const HEADER_HEADINGS = [
    { headingName: 'About', headingHref: '/' },
    { headingName: 'Pricing', headingHref: '/pricing' },
    { headingName: 'Services', headingHref: '/' },
    { headingName: 'Login', headingHref: '/login' },
    { headingName: 'Register', headingHref: '/register' },
];

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

export const FAQS: FaqsDataType = {
    whatIsCardAxe: {
        question: 'What is CardAxe?',
        answer:
            'CardAxe is a digital solution for creating and sharing business cards and company portfolios. It offers a modern, eco-friendly alternative to traditional paper cards, allowing you to design, customize, and distribute your card online with ease.',
    },
    canUseOnMobile: {
        question: 'Can I use CardAxe on my mobile phone?',
        answer:
            'Yes, CardAxe is fully optimized for mobile devices. You can create, edit, and share your digital business card directly from your smartphone or tablet, ensuring you always have your card on hand.',
    },
    perksOfProPlan: {
        question: 'What are the perks of the Pro plan?',
        answer:
            'The Pro plan offers advanced features including premium templates, custom domain integration, enhanced analytics, priority support, and additional storage for multimedia content. It’s designed for users who want to maximize the impact and functionality of their digital business cards.',
    },
    canChangePlan: {
        question: 'Can I change my plan later?',
        answer:
            'Yes, you can upgrade or downgrade your plan at any time. Simply go to your account settings and select the plan that best suits your needs. Changes will be applied immediately, and any unused portion of your current plan will be prorated.',
    },
    canUpdateCard: {
        question: 'Can I keep updating my card myself?',
        answer:
            'Absolutely! With CardAxe, you have full control over your digital business card. You can update your information, design, and multimedia content as often as you like to keep your card current and relevant.',
    },
};