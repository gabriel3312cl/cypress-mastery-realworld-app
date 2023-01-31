describe('Authentication', () => {

    beforeEach(() => {
        cy.task("db:seed");
    });

    it('should redirect unauthenticated user to home page', () => {

    });

    context('Sign up', () => {
        it('should redirect to home page after sign up as logged in', () => {

        });

        it('should display sign up errors', () => {
            // - when username is empty
            // - when username is taken
            // - when email is empty
            // - when email is taken
            // - when password is empty
            // - when password length < 4
        });

    });

    context('Sign in', () => {
        it('should be able to login and logout', () => {

        });

        it('should display login errors', () => {
            // - when email is empty
            // - when wrong email format
            // - when password is empty
            // - when password length < 4
            // - when invalid user
            // - when invalid password for existing user
        });
    });
});