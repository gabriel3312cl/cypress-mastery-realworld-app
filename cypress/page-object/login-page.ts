type InputName =
    | "email"
    | "password"

class LoginPage {

    elements = {
        emailInput: () => cy.getByTestId("email-input"),
        passwordInput: () => cy.getByTestId("password-input"),
        signInButton: () => cy.getByTestId("signin-btn"),
        validationMessage: (input: InputName) => cy.getByTestId(`${input}-validation-msg`),
        errorMessage: () => cy.getByTestId("error-message")
    }

    navigate() {
        cy.visit('/login');
    }

    typeEmail(email: string) {
        this.elements.emailInput().type(email);
    }

    typePassword(password: string) {
        this.elements.passwordInput().type(password);
    }

    clickSignIn() {
        cy.intercept("POST", `${Cypress.env("apiUrl")}/users/login`).as("signup");

        this.elements.signInButton().click();
        cy.wait("@signup");
    }
}

export default LoginPage;
