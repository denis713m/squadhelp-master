import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConfirmDeleteDialog.module.sass'

const ConfirmDeleteDialog = props => {
    return (
        <div className={styles.container}>
            <h1>Are you sure?</h1>
            <p>You want to delete event</p>
            <p>{props.event}?</p>
            <button onClick={props.onClose}>No</button>
            <button
                onClick={() => {
                    props.deleteEvent(props.eventId);
                    props.onClose();
                }}
            >
                Yes, Delete it!
            </button>
        </div>
    );
};

export default ConfirmDeleteDialog;

ConfirmDeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    event: PropTypes.string.isRequired,
    eventId: PropTypes.number.isRequired
};

