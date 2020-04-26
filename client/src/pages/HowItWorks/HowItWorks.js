import React from 'react';
import HowItworksHeader from '../../components/HowItWorksHeader/HowItworksHeader';
import styles from './HowItWorks.module.sass';
import WistiaEmbed from '../../api/WistiaPlayer/WistiaEmbeded';

const HowItWorks = () => {

    return (
        <div>
            <HowItworksHeader/>
            <section className={styles.mainContainer}>
                <div className={styles.howItWorkHeader}>
                    <div className={styles.video}>
                        <WistiaEmbed hashedId="vfxvect60o"  />
                    </div>
                    <div className={styles.headerLabel}>
                        <h2>
                            How Does Squadhelp Work?
                        </h2>
                        <p>
                            Squadhelp allows you to host branding competitions to engage with the most
                            creative people across the globe and get high-quality results, fast. Thousands
                            of creatives compete with each other, suggesting great name ideas. At the end
                            of the collaborative contest, you select one winner. The winner gets paid, and
                            you get a strong brand name that will help you succeed! It's quick, simple, and
                            costs a fraction of an agency.
                        </p>

                    </div>

                </div>
            <div className='player-wrapper'>



               {/* <WistiaEmbed hashedId="vfxvect60o" playerColor="#54bbff" plugin={plugins} />*/}
            </div>

            </section>
        </div>
);
};

export default HowItWorks;