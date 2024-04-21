function ErrorMessage({ errorText }) {
    return (
        <div
            className="error-messages"
            data-testid="error-message">
            <p>{errorText}</p>
        </div>
    )
};

export default ErrorMessage;