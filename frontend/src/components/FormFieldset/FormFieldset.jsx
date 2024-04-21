import React from "react";
import styles from "../../Form.module.css";

function FormFieldset({
  autoFocus,
  children,
  handler,
  minLength,
  name,
  normal,
  placeholder,
  required,
  type,
  value,
  testid,
  error,
  onBlur,
}) {
  const validationError = error ? (error[name]?.dirty && error[name]?.error && error[name]?.message) : null;

  return (
    <fieldset className="form-group">
      <input
        autoFocus={autoFocus}
        className={`form-control ${normal ? "" : "form-control-lg"} ${
          validationError && styles.formFieldError
        }`}
        minLength={minLength}
        name={name}
        data-testid={testid}
        onChange={handler}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {children}
      {validationError && (
        <p className={styles.formFieldErrorMessage} data-testid={`${name}-validation-msg`}>
          {validationError}
        </p>
      )}
    </fieldset>
  );
}

export default FormFieldset;
