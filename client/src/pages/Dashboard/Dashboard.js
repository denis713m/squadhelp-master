import React from 'react';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './Dashboard.module.sass';
import EventBadgeTimer from '../../components/EventBadgeTimer/EventBadgeTimer';
import ModeratorDashboard from '../../components/ModeratorDashboard/ModeratorDashboard';


const Dashboard = (props) => {
    const {role, history} = props;
    return (
        <div>
            <Header/>
            {
                role === CONSTANTS.CUSTOMER ?
                    [
                        <EventBadgeTimer key={'eventBadge'} />,
                        <CustomerDashboard key={'dashboard'} history={history} match={props.match}/>
                    ]
                    :role === CONSTANTS.CREATOR ?
                    <CreatorDashboard history={history} match={props.match}/>
                    :
                    <ModeratorDashboard/>
            }
            {
                role !== CONSTANTS.MODERATOR &&
                <div className={styles.btnContainer}>
                    <Link to='/Transactions' style={{ textDecoration: 'none' }}>
                        <div className={styles.button}>Go to my transactions</div>
                    </Link>
                    {
                        role === CONSTANTS.CUSTOMER &&
                        <Link to='/EventsTimer' style={{ textDecoration: 'none' }} target={'blank'}>
                            <div className={styles.button}>Events</div>
                        </Link>
                    }
                </div>

            }

        </div>
    );
};

const mapStateToProps = (state) => {
    return state.userStore.data
};

export default connect(mapStateToProps)(Dashboard);
