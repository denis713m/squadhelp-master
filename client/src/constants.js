import React from 'react';

const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const PHONE_NUMBER = 'localhost';
const serverPort = env === 'production' ? 3000 : 9632;
export default {
    CUSTOMER: 'customer',
    CREATOR: 'creator',
    CONTEST_STATUS_ACTIVE: 'active',
    CONTEST_STATUS_FINISHED: 'finished',
    CONTEST_STATUS_PENDING: 'pending',
    NAME_CONTEST: 'name',
    LOGO_CONTEST: 'logo',
    TAGLINE_CONTEST: 'tagline',
    OFFER_STATUS_REJECTED: 'rejected',
    OFFER_STATUS_WON: 'won',
    OFFER_STATUS_PENDING: 'pending',
    STATIC_IMAGES_PATH: '/staticImages/',
    ANONYM_IMAGE_PATH: '/staticImages/anonym.png',
    BASE_URL: `http://${serverIP}:${serverPort}/`,
    ACCESS_TOKEN: 'accessToken',
    publicURL: env === 'production'
        ? `http://${serverIP}:80/images/`
        : `http://${serverIP}:${serverPort}/public/images/`,
    NORMAL_PREVIEW_CHAT_MODE: 'NORMAL_PREVIEW_CHAT_MODE',
    FAVORITE_PREVIEW_CHAT_MODE: 'FAVORITE_PREVIEW_CHAT_MODE',
    BLOCKED_PREVIEW_CHAT_MODE: 'BLOCKED_PREVIEW_CHAT_MODE',
    CATALOG_PREVIEW_CHAT_MODE: 'CATALOG_PREVIEW_CHAT_MODE',
    CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
    ADD_CHAT_TO_OLD_CATALOG: 'ADD_CHAT_TO_OLD_CATALOG',
    CREATE_NEW_CATALOG_AND_ADD_CHAT: 'CREATE_NEW_CATALOG_AND_ADD_CHAT',
    USER_INFO_MODE: 'USER_INFO_MODE',
    CASHOUT_MODE: 'CASHOUT_MODE',
    HEADER_ANIMATION_TEXT: [
        'a Company',
        'a Brand',
        'a Website',
        'a Service',
        'a Book',
        'a Business',
        'an App',
        'a Product',
        'a Startup',
    ],
    FooterItems: [
        {
            title: 'SQUADHELP',
            items: [
                'About',
                'Contact',
                'How It Works?',
                'Testimonials',
                'Our Work',
            ],
        },
        {
            title: 'RESOURCES',
            items: [
                'How It Works',
                'Become a Creative',
                'Business Name Generator',
                'Discussion Forum',
                'Blog',
                'Download eBook',
                'Pricing',
                'Help & FAQs',
            ],
        },
        {
            title: 'OUR SERVICES',
            items: [
                'Naming',
                'Logo Design',
                'Taglines',
                'Premium Names For Sale',
                'Creative Owned Names For Sale',
                'Audience Testing',
                'Trademark Research & Filling',
                'Managed Agency Service',
            ],
        },
        {
            title: 'LEGAL',
            items: [
                'Terms of Service',
                'Privacy Policy',
                'Cookie Policy',
            ],
        },
    ],
    types: ['', 'name,tagline,logo', 'name', 'tagline', 'logo', 'name,tagline', 'logo,tagline', 'name,logo'],
    featuredCategories: [
        ['Agency & Consulting', 'Analytics', 'Automotive', 'Bar & Brewery', 'Beauty & Cosmetics', 'Beer, Wine & Spirits',
            'Bikes Brand', 'Biotech', 'Bots & AI', 'Cannabis & CBD', 'Catering'],
        ['Cleaning', 'Co-Working Space Names', 'Coffee', 'Construction & Architecture', 'Crowdfunding',
            'Cryptocurrency, Blockchain', 'Dating & Relationship', 'Daycare', 'Dental', 'Drone', 'E-Commerce & Retail'],
        ['Education & Training', 'Entertainment & Arts', 'Event Planning & Services', 'Events & Conferences', 'Fashion & Clothing',
            'Finance', 'Fintech (Finance Technology)', 'Fitness & Gym', 'Food & Drink', 'Food Delivery & Meal Kits', 'Food Truck'],
        ['Footwear', 'Furniture & Home Furnishings', 'Games & Recreational', 'Gaming', 'Green & Organic', 'Health & Wellness',
            'Home', 'Home & Garden', 'Insurance', 'Interior Design', 'Internet of Things (IOT)', 'Jewelry', 'Kids & Baby', 'Landscaping',
            'Legal, Attorney, Law', 'Life Coach / Motivational', 'Manufacturing', 'Marketing & Advertising', 'Medical & Dental',
            'Mobile App', 'Mortgage', 'Movies & TV', 'Music & Audio', 'News & Media',
            'Non - Profit & Community', 'Oil and Gas', 'Outdoor & Adventure', 'Payment',
            'Payroll', 'Pets', 'Pharma', 'Photography', 'Podcast', 'Politics / Government', 'Professional Services',
            'Property Management', 'Real Estate', 'Recruitment & Staffing', 'Restaurants', 'Sales & Marketing',
            'Security', 'Senior Living and Care', 'Social & Networking', 'Solar Power and Green Energy',
            'Something Else', 'Spas & Salons', 'Sports', 'Startup Incubator', 'Storage',
            'Tech, Internet, Software', 'Transportation', 'Travel & Hotel', 'Tutoring & bTest Prep', 'Venture Capital & Investment',
            'Video, Books & Magazines', 'Virtual Reality(VR) and Augmented Reality(AR) Company', 'Vitamins and Supplements', 'Weddings & Bridal'],
    ]
};