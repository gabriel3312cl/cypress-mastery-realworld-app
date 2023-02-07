type InputName =
    | "username"
    | "email"
    | "password"

class RegisterPage {

    elements = {
        usernameInput: () => cy.getByTestId("username-input"),
        emailInput: () => cy.getByTestId("email-input"),
        passwordInput: () => cy.getByTestId("password-input"),
        signUpButton: () => cy.getByTestId("signup-btn"),
        validationMessage: (input: InputName) => cy.getByTestId(`${input}-validation-msg`),
        errorMessage: () => cy.getByTestId("error-message")
    }
    
    navigate() {
        cy.visit('/register');
    }

    typeUsername(username: string) {
        this.elements.usernameInput().type(username);
    }

    typeEmail(email: string) {
        this.elements.emailInput().type(email);
    }

    typePassword(password: string) {
        this.elements.passwordInput().type(password);
    }

    clickSignUp() {
        cy.intercept("POST", `${Cypress.env("apiUrl")}/users`).as("signup");

        this.elements.signUpButton().click();
        cy.wait("@signup");
    }
}
export default RegisterPage;