import React from 'react';
import {withRouter} from 'react-router-dom';
import styles from './Notification.module.sass';


const Notification = (props) => {
    return (
        <div>
            <br/>
            <span>{props.message}</span>
            <br/>
            {props.contestId && <span onClick={() => props.history.push(`/contest/${props.contestId}`)} className={styles.goToContest}>Go to contest</span>}
            {props.events && <span onClick={() => props.history.push(`/EventsTimer`)} className={styles.goToContest}>Go to events</span>}
        </div>
    )
};


export default withRouter(Notification);

