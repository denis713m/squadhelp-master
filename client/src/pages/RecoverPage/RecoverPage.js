import React, { useEffect } from 'react';
import CONTANTS from '../../constants';
import { updatePasswordAndGetUserAction } from '../../actions/actionCreator';
import { connect } from 'react-redux';

const RecoverPage = (props) => {
    useEffect(() => {
        props.updatePassword(props.history.replace);
    },[]);
    window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, props.match.params.id);
    return (
        <div>
            You are updating your password. This window should disappear. If you steel see this window try to change password one more time
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (data) => dispatch(updatePasswordAndGetUserAction(data))
    }
};

export default connect(null, mapDispatchToProps)(RecoverPage);