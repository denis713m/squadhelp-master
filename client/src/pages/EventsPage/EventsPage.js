import React from 'react';
import Header from '../../components/Header/Header';
import styles from './EventsPage.module.sass';
import CreateEventSimple from '../../components/CreateEventSimple/CreateEventSimple';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog/ConfirmDeleteDialog';
import {connect} from 'react-redux';
import { addEvent, delEvent } from '../../actions/actionCreator';
import classNames from 'classnames';

function EventsPage(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const {events, delEvent, addEvent} = props;
    const now = moment();
    const del = (e) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <ConfirmDeleteDialog onClose={onClose} deleteEvent={delEvent} event={events[e.currentTarget.id].name}
                                         eventId={Number(e.currentTarget.id)}
                    />

                );
            }
        });
    };

    const getTimers = () => {
        const eventsArray = [];
        const maxRemind = 360;
        events.forEach((event, index) => {
            const remindDays = event.date.diff(now, 'd') < 0 ? 0 : event.date.diff(now, 'd');
            const bacWidth = 100 - remindDays * 100 / maxRemind;
            const className = classNames(styles.timerState, {[styles.timerStateRemind]:  remindDays < event.remind});
            eventsArray.push(
                <button className={styles.timerContainer} id ={index} key={index + event.date} onClick={del}>
                    <div className={className} style={{width: `${bacWidth <= 0 ? 0 : bacWidth}%`}}>
                    </div>
                    <span>{event.name}</span>
                    <div >{`${remindDays} days`}</div>
                </button>
            )});
        return eventsArray;
    };
    const handleSubmit = values => {
        addEvent(
            {
                name:values.name,
                date: moment(values.date, 'YYYY.MM.DD'),
                remind: Number(values.remind)
            });
        closeModal();
    };

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <h1>All events</h1>

                    {events.length && events.length !== 0 ?
                        getTimers()
                        :
                            <div className={styles.noEvents} >You don't have any Events</div>
                        }
                <section className={styles.btnCreateEventContainer}>
                    <button className={styles.btnCreateEvent} onClick={openModal}>
                        Create Event
                    </button>
                </section>
                {modalIsOpen && <CreateEventSimple onRequestClose={closeModal} onSubmit={handleSubmit}/>}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return state.events
};

const mapDispatchToProps = (dispatch) => {
    return {
        delEvent: (data) => {dispatch(delEvent(data))},
        addEvent: (data) => dispatch(addEvent(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);

