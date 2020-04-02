import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
    label:PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.shape({
        input: PropTypes.string.isRequired,
        warning: PropTypes.string.isRequired,
        notValid: PropTypes.string.isRequired,
        valid: PropTypes.string.isRequired,
        container: PropTypes.string.isRequired
    })


};


export default FormInput;