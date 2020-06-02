import React, { useEffect } from 'react';
import { last } from 'lodash';
import CONTANTS from '../../constants';
import { onlyForNotAuthorize } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const RecoverPage = (props) => {
    const notify = () => {
        toast.success('Your password have already updated!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    useEffect(() => {
        props.checkAuth(props.history.replace);
    },[]);
    window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, last(props.history.location.pathname.split('/')));
    return (
        <div>
            You are updating your password. This window should disappear. If you steel see this window try to change password one more time
        </div>
    );
};

const mapStateToProps = (state) => {
    return state.userStore;
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: (data) => dispatch(onlyForNotAuthorize(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPage);