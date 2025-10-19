class LoginPage {
    elements = {
        emailInput: () => cy.getByTestId('email-input'),
        passwordInput: () => cy.getByTestId('password-input'),
        signInButton: () => cy.getByTestId('signin-btn'),
        errorMessage: () => cy.getByTestId('error-message'),
    }
    visit() {
        cy.visit('/login');
        //this.elements.loadingIcon().should('not.be.visible');
        //this.elements.table().should('be.visible');
    }
    typeEmail(email) {
        this.elements.emailInput().type(email);
    }
    typePassword(password) {
        this.elements.passwordInput().type(password);
    }
    clickSignInButton() {
        this.elements.signInButton().click();
    }
    /*
    login(email, password) {
        this.typeEmail(email);
        this.typePassword(password);
        this.clickSignInButton();
    }
    */
}

export default LoginPage;