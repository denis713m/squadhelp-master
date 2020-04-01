import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.sass';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {clearErrorSignUpAndLogin} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import Home from "../Home/Home";
import {Route, Router} from 'react-router-dom';
import Error from "../../components/Error/Error";

const LoginPage = (props) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginContainer}>
                <div className={styles.headerSignUpPage}>
                    <Link to='/' >
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
                    </Link>
                    <div className={styles.linkLoginContainer}>
                        <Link to='/registration' style={{textDecoration: 'none'}}><span>Signup</span></Link>
                    </div>
                </div>
                <div className={styles.loginFormContainer}>
                        <h2>LOGIN TO YOUR ACCOUNT</h2>
                    <LoginForm />

                </div>
            </div>
        </div>
    )

};


const mapDispatchToProps = (dispatch) => {
    return {
        clearError: () => dispatch(clearErrorSignUpAndLogin())
    }
};

export default connect(null, mapDispatchToProps)(LoginPage);