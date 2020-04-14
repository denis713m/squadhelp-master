import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './FormInput.module.sass'

const FormInput = (props) => {
    const {label, input, type, className, meta: {touched, error}} = props;

    return (
        <div className={className.container}>
            <input {...input} placeholder={label} type={type}
                   className={classNames(className.input, {[className.notValid]: touched && error,  [className.valid]: touched && !error})}/>
            {className.warning && (touched && (error && <span className={className.warning}>{error}</span>))}
        </div>
    )
};

FormInput.propTypes = {
    label:PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.exact({
        input: PropTypes.string,
        warning: PropTypes.string,
        notValid: PropTypes.string,
        valid: PropTypes.string,
        container: PropTypes.string
    })
};

FormInput.defaultProps = {
    className: ({
        notValid: styles.notValid,
        valid: styles.valid,
    })
};


export default FormInput;