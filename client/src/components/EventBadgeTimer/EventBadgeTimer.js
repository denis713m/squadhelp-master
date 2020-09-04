import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './EventBadgeTimer.module.sass';
import moment from 'moment';
import { Link } from 'react-router-dom';

const EventBadgeTimer = (props) => {
    const {events} = props;
    const [now,setNow] = React.useState(moment());
    const checkEvents = events.reduce((res, event) => {
        if (event.date.diff(now, 'd') <= event.remind ) {
            res ++;
        }
        return res;
    }, 0);
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(moment());
        }, 24 * 60 * 60 * 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <Link to='/EventsTimer' style={{ textDecoration: 'none' }} target={'blank'} className={styles.badgeContainer}>
            {events.length!==0 && checkEvents > 0 && <div className={styles.badge}>
            {checkEvents}
            <span className={styles.tooltiptext}>{`You have ${checkEvents} upcoming events`}</span>
        </div>}
        </Link>
    );
};
const mapStateToProps = (state) => {
    return state.events
};

export default connect(mapStateToProps)(EventBadgeTimer);