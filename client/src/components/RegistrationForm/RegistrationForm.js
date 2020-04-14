import React from 'react';
import styles from './RegistrationForm.module.sass';
import {Field, reduxForm} from 'redux-form';
import FormInput from '../FormInput/FormInput';
import RoleInput from '../RoleInput/RoleInput';
import AgreeTermOfServiceInput from '../AgreeTermOfServiceInput/AgreeTermOfServiceInput';
import CONSTANTS from '../../constants';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';


const RegistrationForm = (props) => {

    const className = {
        container: styles.inputContainer,
        input: styles.input,
        warning: styles.fieldWarning,
    };

    const {handleSubmit, submitting} = props;

    return (

        <form onSubmit={handleSubmit} className={styles.signUpFormContainer}>
            <div className={styles.row}>
                <Field
                    name='firstName'
                    className={className}
                    component={FormInput}
                    type='text'
                    label='First name'
                />
                <Field
                    name='lastName'
                    className={className}
                    component={FormInput}
                    type='text'
                    label='Last name'
                />
            </div>
            <div className={styles.row}>
                <Field
                    name='displayName'
                    className={className}
                    component={FormInput}
                    type='text'
                    label='Display Name'
                />
                <Field
                    name='email'
                    className={className}
                    component={FormInput}
                    type='text'
                    label='Email Address'
                />
            </div>
            <div className={styles.row}>
                <Field
                    name='password'
                    className={className}
                    component={FormInput}
                    type='password'
                    label='Password'
                />
                <Field
                    name='confirmPassword'
                    className={className}
                    component={FormInput}
                    type='password'
                    label='Password confirmation'
                />
            </div>
            <div className={styles.choseRoleContainer}>
                <Field name='role' type='radio' value={CONSTANTS.CUSTOMER} strRole='Join As a Buyer'
                       infoRole='I am looking for a Name, Logo or Tagline for my business, brand or product.'
                       component={RoleInput} id={CONSTANTS.CUSTOMER} checked/>
                <Field name='role' type='radio' value={CONSTANTS.CREATOR} strRole='Join As a Creative'
                       infoRole='I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.'
                       component={RoleInput} id={CONSTANTS.CREATOR}/>
            </div>
            <div className={styles.termsOfService}>
                <Field
                    name='agreeOfTerms'
                    classes={{
                        container: styles.termsOfService,
                        warning: styles.fieldWarning
                    }}
                    id='termsOfService'
                    component={AgreeTermOfServiceInput}
                    type='checkbox'
                />

            </div>
            <button type='submit' disabled={submitting} className={styles.submitContainer}>
                <span className={styles.inscription}>Create Account</span>
            </button>
        </form>

    )

};

export default reduxForm({
    form: 'login',
    validate: customValidator(Schems.RegistrationSchem)
})(RegistrationForm);