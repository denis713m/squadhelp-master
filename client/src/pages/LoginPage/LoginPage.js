import React from 'react';
import LoginForm from '../../components/LoginRecoverForm/LoginRecoverForm';
import styles from './LoginPage.module.sass';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { authActionLogin, clearAuth, clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import Error from "../../components/Error/Error";

const LoginPage = ({error, authClear, loginUser, ...restProps}) => {
    const handleSubmit = values => loginUser(values);
    const clearFields = () => authClear();
    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginContainer}>
                <div className={styles.headerSignUpPage}>
                    <Link to='/'>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo"/>
                    </Link>
                    <div>
                        <div className={styles.linkLoginContainer}>
                            <Link to='/registration' style={{textDecoration: 'none'}}><span>Signup</span></Link>
                        </div>
                    </div>
                </div>
                <div className={styles.loginFormContainer}>
                    <h2>LOGIN TO YOUR ACCOUNT</h2>
                    {error && <Error data={error.data} status={error.status} clearError={clearFields}/>}
                    <LoginForm onSubmit={handleSubmit} btnName = 'LOGIN' pass='password'/>
                    <button className={styles.btnForgotPassword}>
                        <Link to='/recoverpassword'
                              style={{textDecoration: 'none'}}><span>FORGOT PASSWORD?</span></Link></button>
                </div>
            </div>
        </div>
    )

};

const mapStateToProps = state => state.auth;

const mapDispatchToProps = (dispatch) => {
    return {
        clearError: () => dispatch(clearErrorSignUpAndLogin()),
        authClear: () => dispatch(clearAuth()),
        loginUser: (data) => dispatch(authActionLogin(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);