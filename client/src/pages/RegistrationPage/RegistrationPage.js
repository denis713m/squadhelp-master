import React  from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {authActionRegister, clearAuth, clearErrorSignUpAndLogin} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import Articles from "../../components/Articles/Articles";
import Error from "../../components/Error/Error";


const RegistrationPage = ({registerUser, error, authClear, ...restProps}) => {

        const handleSubmit = values => registerUser(values);

        return (
            <div className={styles.signUpPage}>
                <div className={styles.signUpContainer}>
                    <div className={styles.headerSignUpPage}>
                        <Link to='/'>
                            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo"/>
                        </Link>
                        <div className={styles.linkLoginContainer}>
                            <Link to='/login' style={{textDecoration: 'none'}}><span>Login</span></Link>
                        </div>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.headerFormContainer}>
                            <h2>
                                CREATE AN ACCOUNT
                            </h2>
                            <h4>
                                We always keep your name and email address private.
                            </h4>
                        </div>

                        {error && <Error data={error.data} status={error.status} clearError={authClear}/>}
                        <RegistrationForm onSubmit={handleSubmit}/>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Articles/>

                </div>
            </div>

        )
    }
;

const mapStateToProps = state => state.auth;

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (data) => dispatch(authActionRegister(data)),
        clearError: () => dispatch(clearErrorSignUpAndLogin()),
        authClear: () => dispatch(clearAuth())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);