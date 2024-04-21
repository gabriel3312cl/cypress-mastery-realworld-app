import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import getArticle from "../../services/getArticle";
import setArticle from "../../services/setArticle";
import FormFieldset from "../FormFieldset";
import FormTextArea from "../FormTextArea/FormTextArea";
import ErrorMessage from "../ErrorMessage";
import { useFormValidator } from "../../helpers/formValidator/useFormValidator";
import FormButton from "../FormButton/FormButton";

const emptyForm = { title: "", description: "", body: "", tagList: "" };

function ArticleEditorForm() {
  const { state } = useLocation();
  const [{ title, description, body, tagList }, setForm] = useState(
    state || emptyForm,
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuth, headers, loggedUser } = useAuth();
  const { errors, validateForm, onBlurField } = useFormValidator({
    title,
    description,
    body,
  });

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const redirect = () => navigate("/", { replace: true, state: null });
    if (!isAuth) return redirect();

    if (state || !slug) return;

    getArticle({ headers, slug })
      .then(({ author: { username }, body, description, tagList, title }) => {
        if (username !== loggedUser.username) redirect();

        setForm({ body, description, tagList, title });
      })
      .catch(console.error);

    return () => setForm(emptyForm);
  }, [headers, isAuth, loggedUser.username, navigate, slug, state]);

  const inputHandler = e => {
    const field = e.target.name;
    const value = e.target.value;
    const nextFormState = {
      title, description, body,
      [field]: value,
    };

    if (errors[field].dirty) {
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
    }
    
    setForm((form) => ({ ...form, [field]: value }));
  };

  const tagsInputHandler = (e) => {
    const value = e.target.value;

    setForm((form) => ({ ...form, tagList: value.split(/,| /) }));
  };


  const formSubmit = (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form: { title, description, body }, errors, forceTouchErrors: true });
    if (!isValid) return;

    setArticle({ headers, slug, body, description, tagList, title })
      .then((slug) => navigate(`/article/${slug}`))
      .catch(setErrorMessage);
  };

  return (
    <form onSubmit={formSubmit}>
      <fieldset>
        {errorMessage && <ErrorMessage errorText={errorMessage}></ErrorMessage>}
        <FormFieldset
          placeholder="Article Title"
          name="title"
          value={title}
          handler={inputHandler}
          onBlur={onBlurField}
          error={errors}
        ></FormFieldset>

        <FormFieldset
          normal
          placeholder="What's this article about?"
          name="description"
          value={description}
          handler={inputHandler}
          onBlur={onBlurField}
          error={errors}
        ></FormFieldset>

        <FormTextArea
          placeholder="Write your article (in markdown)"
          name="body"
          value={body}
          handler={inputHandler}
          onBlur={onBlurField}
          error={errors}
        ></FormTextArea>

        <FormFieldset
          normal
          placeholder="Enter tags"
          name="tags"
          value={tagList}
          handler={tagsInputHandler}
        >
          <div className="tag-list"></div>
        </FormFieldset>

        <FormButton
        text={slug ? "Update Article" : "Publish Article"}
        ></FormButton>
      </fieldset>
    </form>
  );
}

export default ArticleEditorForm;
