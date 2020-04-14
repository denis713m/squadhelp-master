import React from 'react';
import styles from './LoginForm.module.sass';
import {Field, reduxForm} from 'redux-form';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';

const LoginForm = props => {

    const formInputClassNames = {
        container: styles.inputContainer,
        input: styles.input,
        warning: styles.fieldWarning,
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
                    label='password'
                />
                <button type='submit' disabled={submitting} className={styles.submitContainer}>
                    <span className={styles.inscription}>LOGIN</span>
                </button>
            </form>

        );
    }
};

export default reduxForm({
    form: 'login',
    validate: customValidator(Schems.LoginSchem)
})(LoginForm);