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

export interface FeaturesDataType {
    title: string;
    detail: string;
    coverImage: string;
}

export interface CardaxeFlowDataType {
    title: string;
    detail: string;
    icon: 'UserEdit' | 'Edit' | 'Edit2' | 'ElementPlus';
}


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

export const FEATURES_DATA: FeaturesDataType[] = [
    {
        "title": "Quick to Create",
        "detail": "Get your professional digital business card up and running in minutes with CardAxe. Our intuitive design tools make it simple and fast to create a stunning card that represents you and your brand.",
        "coverImage": ""
    },
    {
        "title": "Connect Anywhere You Go",
        "detail": "With CardAxe, your digital business card is always with you. Easily share your contact information on the go, ensuring you never miss an opportunity to network, no matter where you are.",
        "coverImage": ""
    },
    {
        "title": "Connect and Chat Effortlessly",
        "detail": "CardAxe not only lets you share your digital business card but also enables seamless communication. Connect with your contacts and start conversations effortlessly, all from one platform.",
        "coverImage": ""
    },
];

export const CardaxeFlowData: CardaxeFlowDataType[] = [
    {
        "title": "Sign Up",
        "detail": "Register for a free account on our platform",
        "icon": "UserEdit",
    },
    {
        "title": "Choose a Template",
        "detail": "Select from our wide range of professionally designed templates.",
        "icon": "Edit",
    },
    {
        "title": "Customize",
        "detail": "Add your contact information, upload your photo, and personalize your card to reflect your brand.",
        "icon": "Edit2",
    },
    {
        "title": "Save & Share",
        "detail": "Save your card and start sharing it with your professional network instantly.",
        "icon": "ElementPlus",
    }
]