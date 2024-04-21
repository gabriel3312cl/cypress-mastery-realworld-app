import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userLogin from "../../services/userLogin";
import { useFormValidator } from "../../helpers/formValidator/useFormValidator";
import FormFieldset from "../FormFieldset";
import FormButton from "../FormButton/FormButton";


function LoginForm({ onError }) {
	const [form, setForm] = useState({ email: "", password: "" });
	const { errors, validateForm, onBlurField } = useFormValidator(form);
	const { setAuthState } = useAuth();
	const navigate = useNavigate();

	const inputHandler = e => {
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

		userLogin(form)
			.then(setAuthState)
			.then(() => navigate("/"))
			.catch(onError);
	};

	return (
		<form onSubmit={onSubmitForm}>
			<FormFieldset
				placeholder={"Email"}
				name={"email"}
				testid={"email-input"}
				handler={inputHandler}
				onBlur={onBlurField}
				value={form.email}
				error={errors}
			></FormFieldset>

			<FormFieldset
				placeholder={"Password"}
				name={"password"}
				testid={"password-input"}
				handler={inputHandler}
				onBlur={onBlurField}
				value={form.password}
				type={"password"}
				error={errors}
			></FormFieldset>

			<FormButton
				text={"Sign in"}
				testid={"signin-btn"}
			></FormButton>
		</form>
	);
}

export default LoginForm;
