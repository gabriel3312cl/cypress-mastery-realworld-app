import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userSignUp from "../../services/userSignUp";
import { useRegisterFormValidator } from "./hooks/useRegisterFormValidator";
import clsx from "clsx";
import styles from "../../ValidationForm.module.css";

function SignUpForm({ onError }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const { errors, validateForm, onBlurField } = useRegisterFormValidator(form);
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const onUpdateField = e => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };

    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };

  const onSubmitForm = e => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;

    if (isValid) {
      userSignUp(form)
        .then(setAuthState)
        .then(() => navigate("/"))
        .catch(onError);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className={"form-group"}>
        <input
          className={clsx(
            "form-control form-control-lg",
            errors.username.dirty &&
            errors.username.error &&
            styles.formFieldError
          )}
          type="text"
          aria-label="username field"
          placeholder="Username"
          name="username"
          id="username"
          data-testid="username-input"
          value={form.username}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.username.dirty && errors.username.error ? (
          <p
            className={styles.formFieldErrorMessage}
            data-testid="username-validation-msg">
            {errors.username.message}
          </p>
        ) : null}
      </div>

      <div className={"form-group"}>
        <input
          className={clsx(
            "form-control form-control-lg",
            errors.email.dirty &&
            errors.email.error &&
            styles.formFieldError
          )}
          type="text"
          aria-label="Email field"
          placeholder="Email"
          name="email"
          id="email"
          data-testid="email-input"
          value={form.email}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.email.dirty && errors.email.error ? (
          <p
            className={styles.formFieldErrorMessage}
            data-testid="email-validation-msg">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className={"form-group"}>
        <input
          className={clsx(
            "form-control form-control-lg",
            errors.password.dirty &&
            errors.password.error &&
            styles.formFieldError
          )}
          type="password"
          aria-label="Password field"
          placeholder="Password"
          name="password"
          id="password"
          data-testid="password-input"
          value={form.password}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.password.dirty && errors.password.error ? (
          <p
            className={styles.formFieldErrorMessage}
            data-testid="password-validation-msg">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className={styles.formActions}>
        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          data-testid="signup-btn">
          Sign up
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
