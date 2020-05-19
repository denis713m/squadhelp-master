import React from 'react';
import styles from './HowItWorksFooter.module.sass'
import CONSTANTS from './../../constants'
import { Icon } from '@iconify/react';
import bxlTwitter from '@iconify/icons-bx/bxl-twitter';
import bxlFacebook from '@iconify/icons-bx/bxl-facebook';


const HowItWorksFooter = () => {
    const getHrefs = (hrefs) =>{
        const hrefsArray = [];
        hrefs.forEach((href, index) => hrefsArray.push(<a key={`${href}+${index}`} href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}>{href}</a>));
        return hrefsArray
    };

    return (
        <>
            <div className={styles.top}>
                <div className={styles.topContainer}>
                    <div className={styles.mainCategories}>
                        <div className={styles.mainCategoryConteiner}>
                            <div className={styles.mainCategoryTitle}>
                                SQUADHELP
                            </div>
                            <div className={styles.mainCategoryCategories}>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}>About</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}>Contact</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}>Testimonials</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}>Our Work</a>
                            </div>
                        </div>
                        <div className={styles.mainCategoryConteiner}>
                            <div className={styles.mainCategoryTitle}>
                                OUR SERVICES
                            </div>
                            <div className={styles.mainCategoryCategories}>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Naming</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Logo Design</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Taglines</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Business Names For Sale</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Audience Testing</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Trademark Research & Filing</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Managed Agency Service</a>
                            </div>
                        </div>
                        <div className={styles.mainCategoryConteiner}>
                            <div className={styles.mainCategoryTitle}>
                                RESOURCES
                            </div>
                            <div className={styles.mainCategoryCategories}>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> How It Works</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Become a Creative</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Discussion Forum</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Blog</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Download eBook</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Pricing</a>
                                <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Help & FAQs</a>
                            </div>
                        </div>
                        <div className={styles.mainCategoryConteiner}>
                            <div className={styles.mainCategorySubConteiner}>
                                <div className={styles.mainCategoryTitle}>
                                    IMPORTANT GUIDELINES
                                </div>
                                <div className={styles.mainCategoryCategories}>
                                    <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Tips For Contest Holders</a>
                                    <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Tips For Contestants</a>
                                </div>
                            </div>
                            <div className={styles.mainCategorySubConteiner}>
                                <div className={styles.mainCategoryTitle}>
                                    LEGAL
                                </div>
                                <div className={styles.mainCategoryCategories}>
                                    <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Terms of Service</a>
                                    <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Privacy Policy</a>
                                    <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}> Cookie Policy</a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className={styles.featureCategoryTitle}>
                            FEATURED CATEGORIES
                        </div>
                        <div className={styles.featuredCategoriesCont}>
                            <div className={styles.featureCatgorCategories}>

                                {getHrefs(CONSTANTS.featuredCategories[0])}
                            </div>
                            <div className={styles.featureCatgorCategories}>

                                {getHrefs(CONSTANTS.featuredCategories[1])}
                            </div>
                            <div className={styles.featureCatgorCategories}>
                                {getHrefs(CONSTANTS.featuredCategories[2])}
                            </div>
                            <div className={styles.featureCatgorCategories}>
                                {getHrefs(CONSTANTS.featuredCategories[3])}
                            </div>
                        </div>
                        <a href={'http://localhost:3000/howitworks.php'} className={styles.mainCategorHref}>squadhelp.com has a Shopper Approved rating of 4.9/5 based on 2684 ratings and reviews.</a>

                    </div>

                </div>

            </div>
            <div className={styles.bottom}>
                <div className={styles.bottomContainer}>
                <div className={styles.bottomLogo}>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}footer-logo.png`} className={styles.logo}
                         alt='blue_logo'/>
                         <span className={styles.copyright}>Copyright © 2017 Squadhelp Inc</span>
                </div>
                <div className={styles.bottomContacts}>
                    <a href='http://localhost:3000/howitworks.php' className={styles.contactContainer}>
                        <Icon icon={bxlFacebook} className={styles.fafIcon}/>
                    </a>
                    <a href='http://localhost:3000/howitworks.php' className={styles.contactContainer}>
                        <Icon icon={bxlTwitter} className={styles.fafIcon}/>
                    </a>
                </div>
                </div>

            </div>


        </>
    );
};

export default HowItWorksFooter;