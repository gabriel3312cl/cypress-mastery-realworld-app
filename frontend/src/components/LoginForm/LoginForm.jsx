import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userLogin from "../../services/userLogin";
import { useLoginFormValidator } from "./hooks/useLoginFormValidator";
import clsx from "clsx";
import styles from "../../ValidationForm.module.css";

function LoginForm({ onError }) {
	const [form, setForm] = useState({ email: "", password: "" });
	const { errors, validateForm, onBlurField } = useLoginFormValidator(form);
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
			userLogin(form)
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
						errors.email.dirty &&
						errors.email.error &&
						styles.formFieldError
					)}
					type="text"
					aria-label="Email field"
					placeholder="Email"
					name="email"
					value={form.email}
					onChange={onUpdateField}
					onBlur={onBlurField}
				/>
				{errors.email.dirty && errors.email.error ? (
					<p className={styles.formFieldErrorMessage}>
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
					value={form.password}
					onChange={onUpdateField}
					onBlur={onBlurField}
				/>
				{errors.password.dirty && errors.password.error ? (
					<p className={styles.formFieldErrorMessage}>
						{errors.password.message}
					</p>
				) : null}
			</div>

			<div className={styles.formActions}>
				<button className="btn btn-lg btn-primary pull-xs-right" type="submit">
					Sign in
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
