import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userSignUp from "../../services/userSignUp";
import { useFormValidator } from "../../helpers/formValidator/useFormValidator";
import FormFieldset from "../FormFieldset";
import FormButton from "../FormButton/FormButton";

function SignUpForm({ onError }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const { errors, validateForm, onBlurField } = useFormValidator(form);
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
      <FormFieldset
        placeholder={"Username"}
        name={"username"}
        testid={"username-input"}
        handler={onUpdateField}
        onBlur={onBlurField}
        value={form.username}
        error={errors}
      ></FormFieldset>

      <FormFieldset
        placeholder={"Email"}
        testid={"email-input"}
        name={"email"}
        handler={onUpdateField}
        onBlur={onBlurField}
        value={form.email}
        error={errors}
      ></FormFieldset>

      <FormFieldset
        placeholder={"Password"}
        name={"password"}
        testid={"password-input"}
        handler={onUpdateField}
        onBlur={onBlurField}
        value={form.password}
        type={"password"}
        error={errors}
      ></FormFieldset>

        <FormButton
          text={"Sign up"}
          testid={"signup-btn"}
        ></FormButton>
    </form>
  );
}

export default SignUpForm;
