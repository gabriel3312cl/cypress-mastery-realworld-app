import React from 'react';
import styles from "../../Form.module.css";


function FormTextArea({
    name,
    value,
    placeholder,
    handler,
    onBlur,
    error,
    className,
}) {
    const validationError = error ? (error[name]?.dirty && error[name]?.error && error[name]?.message) : null;

    return (
        <fieldset className="form-group">
            <textarea
                className={`form-control ${className} ${validationError && styles.formFieldError}`}
                rows="8"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handler}
                onBlur={onBlur}
            ></textarea>
            {validationError && (
                <p className={styles.formFieldErrorMessage} data-testid={`${name}-validation-msg`}>
                    {validationError}
                </p>
            )}
        </fieldset>
    );
};

export default FormTextArea;
