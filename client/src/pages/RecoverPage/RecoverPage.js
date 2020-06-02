import React, { useEffect } from 'react';
import { last } from 'lodash';
import CONTANTS from '../../constants';
import { onlyForNotAuthorize } from '../../actions/actionCreator';
import { connect } from 'react-redux';

const RecoverPage = (props) => {
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