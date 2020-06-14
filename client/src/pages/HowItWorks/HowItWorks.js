import React from 'react';
import HowItworksHeader from '../../components/HowItWorksHeader/HowItworksHeader';
import styles from './HowItWorks.module.sass';
import WistiaEmbed from '../../api/WistiaPlayer/WistiaEmbeded';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import envelopeO from '@iconify/icons-fa/envelope-o';
import HowItWorksFooter from '../../components/HowItWorksFooter/HowItWorksFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import browserHistory from '../../browserHistory';


class HowItWorks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isScrollShow: false,
        };
    }

    updateDimensions = () => {
        const headerHeight = window.scrollY;
        const windowWidth = window.innerWidth;
        if ( ((windowWidth >= 768) && (headerHeight > 115)) || ((windowWidth < 768) && (headerHeight > 70)) ) {
            this.setState({isScrollShow: true});
        }
        else {
            this.setState({isScrollShow: false});
        }

    };

    componentDidMount() {
        window.addEventListener('scroll', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateDimensions);
    }

    render() {
        return (
            <>
                <div id={'header'}></div>
                <HowItworksHeader history={browserHistory}/>
                <section className={styles.mainContainer}>
                    <div className={styles.howItWorkHeader}>
                        <div className={styles.video}>
                            <WistiaEmbed hashedId='vfxvect60o'/>
                        </div>
                        <div className={styles.headerLabel}>
                            <h2 className={styles.howItWorkHeaderH2}>
                                How Does Squadhelp Work?
                            </h2>
                            <p className={styles.howItWorkHeaderParag}>
                                Squadhelp allows you to host branding competitions to engage with the most
                                creative people across the globe and get high-quality results, fast. Thousands
                                of creatives compete with each other, suggesting great name ideas. At the end
                                of the collaborative contest, you select one winner. The winner gets paid, and
                                you get a strong brand name that will help you succeed! It's quick, simple, and
                                costs a fraction of an agency.
                            </p>
                        </div>
                    </div>
                    <div className={styles.stepsWraper}>
                        <h2 className={styles.stepsHeader}>
                            5 Simple Steps
                        </h2>
                        <div className={styles.stepsContainer}>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepNumberSelected}>1</div>
                                <div className={styles.stepTitle}>Start Your Contest</div>
                                <div className={styles.step}>Complete our fast, easy project brief template, and we’ll
                                    share
                                    it with our community of more than 70,000 Creatives.
                                </div>
                            </div>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepNumber}>2</div>
                                <h4 className={styles.stepTitle}>Ideas Start Pouring In</h4>
                                <div className={styles.step}>You will start receiving name ideas - created specifically
                                    for
                                    you - within minutes. Dozens of contestants work for you at the same time! A typical
                                    naming contest receives several hundred name ideas. All ideas are automatically
                                    checked
                                    for URL availability.
                                </div>
                            </div>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepNumber}>3</div>
                                <h4 className={styles.stepTitle}>Collaborate and Communicate</h4>
                                <div className={styles.step}>See all your submissions from your contest dashboard. Rate
                                    entries, leave private comments, and send public messages, leading the process
                                    towards
                                    the perfect name.
                                </div>
                            </div>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepNumber}>4</div>
                                <h4 className={styles.stepTitle}>Validate</h4>
                                <div className={styles.step}>Choose your name with confidence. Our unique validation
                                    process
                                    includes domain checks, trademark risk assessment, linguistics analysis, and
                                    professional audience testing.
                                </div>
                            </div>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepNumber}>5</div>
                                <h4 className={styles.stepTitle}>Pick your winner!</h4>
                                <div className={styles.step}>Once your contest ends, announce the winner - and register
                                    the
                                    name. Come back to Squadhelp to launch a Logo Design or Tagline project for your
                                    name.
                                </div>
                            </div>

                        </div>

                    </div>
                    <section className={styles.btnStartContestContainer}>
                        <a href={'https://www.squadhelp.com/contesttype'} className={styles.btnStartContest}>
                            START A CONTEST
                        </a>

                    </section>
                </section>
                <section className={styles.mainContainer}>
                    <div className={styles.questionsContainer}>
                        <div className={styles.FAQTitleContainer}>
                            <div className={styles.FAQQuestion}>
                                ?
                            </div>
                            <div className={styles.FAQTitleBox}>
                                Frequently Asked Questions

                            </div>
                        </div>
                        <div className={styles.questWraper}>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    Why should I use Squadhelp?
                                </div>
                                <div className={styles.question}>
                                    You always have an option of hiring a consultant or coming up with the name
                                    yourself.
                                    However,
                                    Squadhelp builds great brands that succeed faster by connecting you with the most
                                    creative
                                    people across the globe. Most importantly, Squadhelp provides you with choice: you
                                    get
                                    to
                                    see
                                    ideas from dozens (in some cases, hundreds) of contestants before you select a
                                    winner.
                                    Typically, you would spend far less money with Squadhelp (our contests start at
                                    $199)
                                    than
                                    hiring an agency. Also, you will receive immediate results - most contests begin
                                    receiving
                                    submissions within minutes of starting.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    How is Squadhelp Different?
                                </div>
                                <div className={styles.question}>
                                    Since 2011, we have been committed to disrupting the traditional agency model. Our
                                    platform
                                    offers much more than a typical crowdsourcing experience. From Machine Learning to
                                    Audience
                                    Testing to Comprehensive Trademark Validation, you receive best-in-class support for
                                    your
                                    branding projects.
                                </div>
                                <div className={styles.question}>
                                    <strong>Breadth:</strong> Our Contest-Based Crowdsourcing approach allows you to
                                    receive
                                    an
                                    unmatched breadth of
                                    name ideas from dozens of unique, creative minds while working with the world's
                                    largest
                                    branding
                                    community.
                                </div>
                                <div className={styles.question}>
                                    <strong>Quality and Collaboration:</strong> Using an advanced Quality Scoring
                                    Algorithm,
                                    we
                                    ensure that you
                                    receive more ideas from our top-quality creatives, and we use Gamification best
                                    practices to
                                    encourage high-quality brainstorming and two-way communication throughout your
                                    contest.
                                </div>
                                <div className={styles.question}>
                                    <strong>We don’t stop at ideation:</strong> Choose your name with confidence through
                                    our
                                    high-end validation
                                    services. Poll your target demographics to get unbiased feedback on your favorite
                                    names,
                                    and
                                    receive Trademark Risk and Linguistics Analysis Reports developed by a Licensed
                                    Trademark
                                    Attorney.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    Will you help me validate my name?
                                </div>
                                <div className={styles.question}>
                                    Yes! We believe that validating and securing your name is a critical part of your
                                    branding
                                    process. Squadhelp offers domain checks,&nbsp;
                                    <a className={styles.questionHref}
                                       href='https://helpdesk.squadhelp.com/squadhelp-features/squadhelp-trademark-support'>
                                        Trademark support</a>
                                    , linguistics analysis, and&nbsp;
                                    <a className={styles.questionHref}
                                       href='https://www.squadhelp.com/brand-name-testing'>professional
                                        audience testing</a>&nbsp;
                                    testing to help you choose your name with confidence. We even have special
                                    prices for Trademark filing for our customers.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    I’ve never used Squadhelp before. What should I expect?
                                </div>
                                <div className={styles.question}>
                                    Most customers tell us that Squadhelp’s process is effective, easy, fast, and even
                                    fun.
                                    We
                                    constantly hear &nbsp;
                                    <Link className={styles.questionHref} to='/testimonials-feedback'>extremely positive
                                        feedback</Link> &nbsp;
                                    with respect to the breadth of ideas submitted to
                                    each contest, and many customers are surprised at how insightful working with dozens
                                    of
                                    creative
                                    individuals from across the globe can be.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    What kind of work can I crowdsource?
                                </div>
                                <div className={styles.question}>
                                    You can host competitions for Naming, Taglines, Logos, Business cards, Package
                                    design,
                                    other
                                    design projects, and even Product feedback and research.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    What if I don't like anyone's work?
                                </div>
                                <div className={styles.question}>
                                    Our creatives work extremely hard to ensure a successful outcome for all projects.
                                    If
                                    you do
                                    not
                                    like any of the submissions, we can add more days to your contest at no extra cost.
                                    In
                                    addition,
                                    our Gold and Platinum Packages come with a partial refund option. If you do not like
                                    the
                                    quality
                                    of submissions, you can request a refund for the contest award fees (if you keep
                                    your
                                    contest
                                    award as "Not Guaranteed"). We also offer complimentary branding consultation to
                                    ensure
                                    you
                                    get
                                    the best outcome from your contest. Read more about our&nbsp;
                                    <a className={styles.questionHref}
                                       href='https://helpdesk.squadhelp.com/important-sh-policies/refund-policy'>
                                        Refund
                                        policy</a>.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    Can I see any examples?
                                </div>
                                <div className={styles.question}>
                                    Our creatives have submitted more than 5 Million names and thousands of logos on our
                                    platform.
                                    Here are some examples of Names, Taglines, and Logos that were submitted in recent
                                    contests.
                                </div>
                                <ul className={styles.questionUl}>
                                    <li className={styles.questionLi}>
                                        - &nbsp;<a href='https://www.squadhelp.com/Name-Ideas'
                                                   className={styles.questionHref}>Name
                                        Examples</a>
                                    </li>
                                    <li className={styles.questionLi}>
                                        - &nbsp;<a href='https://www.squadhelp.com/tagline-slogan-ideas'
                                                   className={styles.questionHref}>Tagline
                                        Examples</a>
                                    </li>
                                    <li className={styles.questionLi}>
                                        - &nbsp;<a href='https://www.squadhelp.com/logo-design-examples'
                                                   className={styles.questionHref}>Logo
                                        Examples</a>
                                    </li>
                                </ul>

                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    Where can I read about feedback from other customers?
                                </div>
                                <div className={styles.question}>
                                    Thousands of customers have used Squadhelp to find great Names, Taglines and Logos
                                    for
                                    their
                                    businesses. Here are some of the&nbsp;
                                    <Link to='/testimonials-feedback' className={styles.questionHref}>recent customer
                                        testimonials</Link>.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    Who should use Squadhelp?
                                </div>
                                <div className={styles.question}>
                                    Our disruptive approach to naming and branding has been used successfully by just
                                    about
                                    every
                                    type of venture imaginable. Startups and small businesses love our affordable
                                    pricing,
                                    SM&B
                                    gravitate towards our end-to-end service, and large international businesses are
                                    particularly
                                    excited by the breadth of ideas and the rapid results. We have also worked with
                                    nonprofits,
                                    municipalities, associations, event planners, agencies, and more.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    Who will be working on my contest?
                                </div>
                                <div className={styles.question}>
                                    We are an open platform built on the core belief that anyone can have a great idea.
                                    However,
                                    we’ve invested heavily to ensure that the best Creatives on our site participate the
                                    most in
                                    your contest. Our Quality Scoring algorithm and Gamification best practices ensure
                                    high-quality
                                    submission and superior collaboration.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    How much does it cost?
                                </div>
                                <div className={styles.question}>
                                    Our naming competitions start at $199, and our logo design competitions start at
                                    $299.
                                    Also,
                                    there are three additional contest level that each offer more features and benefits.
                                    See
                                    our&nbsp;
                                    <Link to='/squadhelp-pricing' className={styles.questionHref}>Pricing
                                        Page</Link>&nbsp;for
                                    details.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    Do you offer any discount for multiple contests?
                                </div>
                                <div className={styles.question}>
                                    Yes! We have many contest bundles - our most popular being our Name, Tagline, and
                                    Logo
                                    bundle.
                                    Bundles allow you to purchase multiple contests at one time and save as much as from
                                    $75
                                    -
                                    $400.
                                    You can learn more about our bundle options on our &nbsp;
                                    <Link to='/squadhelp-pricing' className={styles.questionHref}>Pricing Page</Link>.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    What if I want to keep my business idea private?
                                </div>
                                <div className={styles.question}>
                                    You can select a Non Disclosure Agreement (NDA) option at the time of launching your
                                    competition. This will ensure that only those contestants who agree to the NDA will
                                    be
                                    able
                                    to
                                    read your project brief and participate in the contest. The contest details will be
                                    kept
                                    private
                                    from other users, as well as search engines.
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.questionTitle}>
                                    Can you serve customers outside the US?
                                </div>
                                <div className={styles.question}>
                                    Absolutely. Squadhelp services organizations across the globe. Our customer come
                                    from
                                    many
                                    countries, such as the United States, Australia, Canada, Europe, India, and MENA.
                                    We’ve
                                    helped
                                    more than 25,000 customer around the world.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.getInTouch}>
                    <div className={styles.getInTouchCounteiner}>
                        <div className={styles.EnvContainer}>
                            <div className={styles.faEnvContainer}>
                                <Icon icon={envelopeO} className={styles.fafIcon}/>
                            </div>
                        </div>
                        <div className={styles.getIntouchQuestCont}>
                            <div className={styles.getIntouchHeader}>
                                Questions?
                            </div>
                            <div className={styles.getIntouchParag}>
                                Check out our&nbsp;
                                <a href='http://help.squadhelp.com' className={styles.getIntouchHref}>
                                    FAQs
                                </a>&nbsp;
                                or send us a&nbsp;
                                <a href="http://localhost:3000/howitworks.php" className={styles.getIntouchHref}>message</a>
                                . For assistance with launching a contest, you can also call
                                us at (877) 355-3585 or schedule a&nbsp;
                                <a href="http://localhost:3000/howitworks.php" className={styles.getIntouchHref}
                                >Branding
                                    Consultation</a>
                            </div>
                        </div>
                        <div className={styles.getIntouchBtn}>
                            GET IN TOUCH
                        </div>
                    </div>
                </section>
                {this.state.isScrollShow &&
                <a href={'#header'} className={styles.scrollUp}>
                    <FontAwesomeIcon icon={faArrowCircleUp}/>
                </a>}
                <div className={styles.intercom}>
                    <svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 28 32"
                         className={styles.interComIco}>
                        <path
                            d="M28,32 C28,32 23.2863266,30.1450667 19.4727818,28.6592 L3.43749107,28.6592 C1.53921989,
                            28.6592 0,27.0272 0,25.0144 L0,3.6448 C0,1.632 1.53921989,0 3.43749107,0 L24.5615088,0
                            C26.45978,0 27.9989999,1.632 27.9989999,3.6448 L27.9989999,22.0490667 L28,22.0490667 L28,32
                            Z M23.8614088,20.0181333 C23.5309223,19.6105242 22.9540812,19.5633836 22.5692242,19.9125333
                            C22.5392199,19.9392 19.5537934,22.5941333 13.9989999,22.5941333 C8.51321617,22.5941333
                            5.48178311,19.9584 5.4277754,19.9104 C5.04295119,19.5629428 4.46760991,19.6105095
                            4.13759108,20.0170667 C3.97913051,20.2124916 3.9004494,20.4673395 3.91904357,20.7249415
                            C3.93763774,20.9825435 4.05196575,21.2215447 4.23660523,21.3888 C4.37862552,21.5168
                            7.77411059,24.5386667 13.9989999,24.5386667 C20.2248893,24.5386667 23.6203743,21.5168
                            23.7623946,21.3888 C23.9467342,21.2215726 24.0608642,20.9827905 24.0794539,20.7254507
                            C24.0980436,20.4681109 24.0195551,20.2135019 23.8614088,20.0181333 Z">

                        </path>
                    </svg>
                </div>
                <HowItWorksFooter/>
            </>
        );
    }


}

export default HowItWorks;