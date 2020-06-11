import React from 'react';
import styles from './HowItWorksHeader.module.sass';
import CONSTANTS from '../../constants';
import { Link } from 'react-router-dom';
import { clearUserStore, headerRequest } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { addDefaultSrc } from '../../api/utils';

class HowItworksHeader extends React.Component {

    componentDidMount() {
        if ( !this.props.data ) {
            this.props.getUser();
        }
    }

    logOut = () => {
        localStorage.clear();
        this.props.clearUserStore();
        this.props.history.replace('/login');
    };

    startContests = () => {
        this.props.history.push('/startContest');
    };

    renderLoginButtons = () => {
        if ( this.props.data ) {
            return (
                <>
                    <div className={styles.userInfo}>
                        <img
                            src={this.props.data.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${this.props.data.avatar}`}
                            onError={(e) => addDefaultSrc(e)}
                            alt='user'/>
                        <span>{`Hi, ${this.props.data.displayName}`}</span>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt='menu'/>
                        <ul>
                            <li><Link to='/dashboard'
                                      style={{textDecoration: 'none'}}><span>View Dashboard</span></Link></li>
                            <li><Link to='/account' style={{textDecoration: 'none'}}><span>My Account</span></Link></li>
                            <li><Link to='http:/www.google.com'
                                      style={{textDecoration: 'none'}}><span>Messages</span></Link></li>
                            <li><Link to='http:/www.google.com' style={{textDecoration: 'none'}}><span>Affiliate Dashboard</span></Link>
                            </li>
                            <li><span onClick={this.logOut}>Logout</span></li>
                        </ul>
                    </div>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`} className={styles.emailIcon} alt='email'/>
                </>
            )
        }
        else {
            return (
                <>
                    <Link to='/login' style={{textDecoration: 'none'}}><span className={styles.btn}>LOGIN</span></Link>
                    <Link to='/registration' style={{textDecoration: 'none'}}><span
                        className={styles.btn}>SIGN UP</span></Link>
                </>
            )
        }
    };

    render() {
        return (
            <div className={styles.headerContainer}>
                <div className={styles.loginSignnUpHeaders}>
                    <div className={styles.contactWraper}>
                        <div className={styles.contactDetails}>
                            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone-call.png`} alt='phone'/>
                            <a href="tel:+8773553585"> (877)&nbsp;355-3585 </ a>
                        </div>
                    </div>
                    <div className={styles.userButtonsWraper}>
                        <div className={styles.userButtonsContainer}>
                            {this.renderLoginButtons()}
                        </div>
                    </div>
                </div>

                <div className={styles.navContainer}>
                    <Link to={'/'}>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`} className={styles.logo}
                             alt='blue_logo'/></Link>
                    <input type="checkbox" id="hideShowPanel" hidden/>
                    <div className={styles.leftNav}>
                        <div className={styles.nav}>
                            <ul className={styles.mainNav}>
                                <li className={styles.space}>
                                </li>
                                <li className={styles.teleMedia}>
                                    <div className={styles.navTogglePhone}>
                                        <FontAwesomeIcon icon={faPhoneAlt} className={styles.fafIcon}/>
                                        <span className={styles.navPhone}>(877)&nbsp;355-3585</span>
                                    </div>
                                </li>
                                <li className={styles.mainNavItem}>
                                    <div className={styles.navToggle}>NAME IDEAS
                                        <FontAwesomeIcon icon={faAngleDown} className={styles.fafIcon}/>
                                        <ul className={styles.dropDownMenu}>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">Beauty</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">Consulting</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">E-Commerce</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">Fashion & Clothing</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">Finance</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">Real Estate</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">Tech</a></li>
                                            <li className={styles.divider}></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">More Categories</a>
                                            </li>
                                        </ul>
                                    </div>

                                </li>
                                <li className={styles.mainNavItem}>
                                    <div className={styles.navToggle}>
                                        CONTESTS
                                        <FontAwesomeIcon icon={faAngleDown} className={styles.fafIcon}/>
                                        <ul className={styles.dropDownMenu}>
                                            <li className={styles.dropDownItem}><Link to='/howitworks.php'>HOW IT
                                                WORKS</Link></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">PRICING</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">AGENCY SERVICE</a></li>
                                            <li className={styles.divider}></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">ACTIVE CONTESTS</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">WINNERS</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">LEADERBOARD</a></li>
                                            <li className={styles.divider}></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">BECOME A
                                                CREATIVE</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={styles.mainNavItem}>
                                    <div className={styles.navToggle}>Our Work
                                        <FontAwesomeIcon icon={faAngleDown} className={styles.fafIcon}/>
                                        <ul className={styles.dropDownMenu}>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">NAMES</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">TAGLINES</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">LOGOS</a></li>
                                            <li className={styles.divider}></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">TESTIMONIALS</a>
                                            </li>
                                        </ul>
                                    </div>

                                </li>
                                <li className={styles.mainNavItem}>
                                    <div className={styles.navToggle}>
                                        Names For Sale
                                        <FontAwesomeIcon icon={faAngleDown} className={styles.fafIcon}/>
                                        <ul className={styles.dropDownMenu}>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">POPULAR NAMES</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">SHORT NAMES</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">INTRIGUING NAMES</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">NAMES BY CATEGORY</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">VISUAL NAME GENERATOR</a>
                                            </li>
                                            <li className={styles.divider}></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">SELL YOUR
                                                DOMAINS</a></li>
                                        </ul>
                                    </div>

                                </li>
                                <li className={styles.mainNavItem}>
                                    <div className={styles.navToggle}>Blog
                                        <FontAwesomeIcon icon={faAngleDown} className={styles.fafIcon}/>
                                        <ul className={styles.dropDownMenu}>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">ULTIMATE NAMING GUIDE</a>
                                            </li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">POETIC DEVICES IN BUSINESS
                                                NAMING</a></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">CROWDED BAR THEORY</a></li>
                                            <li className={styles.divider}></li>
                                            <li className={styles.dropDownItem}><a href="http://localhost:3000/howitworks.php">ALL ARTICLES</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={styles.mediaLogin}>
                                    <div className={styles.navToggle} style={{textDecoration: 'none'}}>
                                        <Link to='/login' style={{textDecoration: 'none'}}><span
                                            className={styles.navLogin}>LOGIN</span></Link>
                                        &nbsp;/&nbsp;
                                        <Link to='/registration' style={{textDecoration: 'none'}}><span
                                            className={styles.navLogin}>SIGN UP</span></Link>

                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className={styles.btnStartContest}>
                            <a href={'https://www.squadhelp.com/contesttype'}>
                                Start Contest
                            </a>

                        </div>
                    </div>
                    <label htmlFor="hideShowPanel">
                        <div className={styles.btnNav}>
                            <div className={styles.line}/>
                            <div className={styles.line}/>
                            <div className={styles.line}/>
                        </div>
                    </label>


                </div>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return state.userStore;
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(headerRequest()),
        clearUserStore: () => dispatch(clearUserStore())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HowItworksHeader);