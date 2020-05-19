import React from 'react';
import styles from './CreateEventSimple.module.sass';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';


function CreateEventSimple(props) {
    const formInputClassNames = {
        container: styles.inputContainer,
        input: styles.input,
        warning: styles.fieldWarning,
    };

    const closeModal = () => props.onRequestClose();
    return (
        <div className={styles.overlay}>
            <form onSubmit={props.handleSubmit} className={styles.container}>
                <h2 className={styles.modalHeader}>Create event</h2>
                <button type='button' className={styles.btnClose} onClick={closeModal}>X</button>
                <Field
                    name='name'
                    className={formInputClassNames}
                    component={FormInput}
                    type='text'
                    label='Event name'
                />
                <Field
                    name='date'
                    className={formInputClassNames}
                    component={FormInput}
                    type='date'
                    value="YYYY-MM-DD"
                    label='date'
                />
                <Field
                    name='remind'
                    className={formInputClassNames}
                    component={FormInput}
                    type='number'
                    label='remind date'
                />
                <button type='submit' className={styles.submitContainer}>
                    <span className={styles.submitBtn}>Create event</span>
                </button>
            </form>
        </div>
    );
}

export default reduxForm({
    form: 'createTimer',
    validate: customValidator(Schems.EventForm)
})(CreateEventSimple);