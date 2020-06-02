import React from 'react';
import styles from './RecoverPasswordPage.module.sass';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';
import Error from '../../components/Error/Error';
import LoginForm from '../../components/LoginRecoverForm/LoginRecoverForm';
import { updatePassword, clearAuth, clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const RecoverPasswordPage = ({error, authClear, updatePassword, validPass, ...restProps}) => {
    const handleSubmit = values => updatePassword(values);
    const clearFields = () => authClear();
    const notify = () => {
        toast.success('Your password almost update. Go to your mail to complete update', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginContainer}>
                <div className={styles.headerSignUpPage}>
                    <Link to='/'>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo"/>
                    </Link>
                    <div className={styles.btnsContainer}>
                        <div className={styles.linkLogRegContainer}>
                            <Link to='/registration' style={{textDecoration: 'none'}}><span>Signup</span></Link>
                        </div>
                        <div className={styles.linkLogRegContainer}>
                            <Link to='/login' style={{textDecoration: 'none'}}><span>Log in</span></Link>
                        </div>
                    </div>
                </div>
                <div className={styles.loginFormContainer}>
                    <h2>RECOVER PASSWORD</h2>
                    {error && <Error data={error.data} status={error.status} clearError={clearFields}/>}
                    {validPass && notify()}
                    <LoginForm onSubmit={handleSubmit} btnName = 'UPDATE PASSWORD' pass='new password'/>
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
        updatePassword: (data) => dispatch(updatePassword(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordPage);