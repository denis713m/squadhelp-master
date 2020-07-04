import React from 'react';
import styles from './Error.module.sass';
import classNames from 'classnames';

const Error=props=>{
    const getMessage=()=>{
        const {status,data}=props;
        switch (status) {
            case 404:
                return data;
            case 400:
                return 'Check the input data';
            case 409:
                return data;
            case 403:
                return 'Bank decline transaction';
            case 406:
                return data;
            default:
                return 'Server Error';
        }
    };

    const {clearError, classes}=props;
    return(
             <span className={classNames(styles.errorField, classes)} onClick={()=>clearError()}>{getMessage()}</span>
    )
};

export default Error;