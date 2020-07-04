import React from 'react';
import styles from './LoginRecoverForm.module.sass';
import {Field, reduxForm} from 'redux-form';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';

const LoginRecoverForm = props => {

    const formInputClassNames = {
        container: styles.inputContainer,
        input: styles.input,
        warning: styles.fieldWarning,
        notValid: styles.notValid,
        valid: styles.valid,
    };

    {
        const {handleSubmit, submitting} = props;
        return (
            <form onSubmit={handleSubmit} className={styles.loginForm}>

                <Field
                    name='email'
                    className={formInputClassNames}
                    component={FormInput}
                    type='text'
                    label='Email Address'
                />
                <Field
                    name='password'
                    className={formInputClassNames}
                    component={FormInput}
                    type='password'
                    label={props.pass}
                />
                <button type='submit' disabled={submitting} className={styles.submitContainer}>
                    <span className={styles.inscription}>{props.btnName}</span>
                </button>
            </form>

        );
    }
};

export default reduxForm({
    form: 'login',
    validate: customValidator(Schems.LoginSchem)
})(LoginRecoverForm);