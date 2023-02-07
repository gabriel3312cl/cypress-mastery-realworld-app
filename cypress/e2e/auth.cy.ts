import RegisterPage from "../page-object/register-page";
import LoginPage from "../page-object/login-page";
import HomePage from "../page-object/home-page";

import userExisting from "../fixtures/user-existing.json";
import userNotExisting from "../fixtures/user-not-existing.json"


describe('Authentication', () => {
    const registerPage = new RegisterPage();
    const loginPage = new LoginPage();
    const homePage = new HomePage();

    const wrongEmailFormat = [
        "plainaddress",            // Missing @ sign and domain
        "@domain.com",             // Missing username
        "email.domain.com",        // Missing @
        "email@domain",            // Missing top level domain (.com/.net/.org/etc)
        "email@domain@domain.com", // Two @ sign
        ".email@domain.com",       // Leading dot in address is not allowed
        "email.@domain.com",       // Trailing dot in address is not allowed
        "email..email@domain.com", // Multiple dots
        "email@-domain.com",       // Leading dash in front of domain is invalid
        "email@domain..com",       // Multiple dot in the domain portion is invalid
    ];

    beforeEach(() => {
        cy.task("db:seed");
    });

    it('should redirect unauthenticated user to home page', () => {
        cy.visit("/settings");
        cy.location("pathname").should("equal", "/");
    });

    context('Sign up', () => {

        beforeEach(() => {
            registerPage.navigate();
        });

        it('should redirect to home page after sign up as logged in', () => {
            cy.contains("Sign in to your account").should('have.attr', 'href', '#/login');

            registerPage.typeUsername(userNotExisting.username);
            registerPage.typeEmail(userNotExisting.email);
            registerPage.typePassword(userNotExisting.password);
            registerPage.clickSignUp();

            cy.location("pathname").should("equal", "/");
            homePage.navBar.elements.navItems().should("contain", userNotExisting.username);
        });

        it('should display sign up validation errors', () => {
            registerPage.typeUsername(userNotExisting.username);
            registerPage.elements.usernameInput().clear().blur();

            registerPage.elements.validationMessage("username").should("be.visible").and("contain", "Username is required");

            registerPage.typeEmail(userNotExisting.email);
            registerPage.elements.emailInput().clear().blur();

            registerPage.elements.validationMessage("email").should("be.visible").and("contain", "Email is required");

            registerPage.typePassword(userNotExisting.password);
            registerPage.elements.passwordInput().clear().blur();

            registerPage.elements.validationMessage("password").should("be.visible").and("contain", "Password is required");

            registerPage.typePassword('abc');
            registerPage.elements.validationMessage("password").should("be.visible").and("contain", "Password must have a minimum 4 characters");

            // cy.visualSnapshot("Display sign up required errors");

            wrongEmailFormat.forEach((email) => {
                registerPage.elements.emailInput().clear();
                registerPage.typeEmail(email);

                registerPage.elements.validationMessage("email").should("be.visible").and("contain", "Incorrect email format");
            });
        });

        it('should display error for taken username', () => {
            registerPage.typeUsername(userExisting.username);
            registerPage.typeEmail(userNotExisting.email);
            registerPage.typePassword(userNotExisting.password);
            registerPage.clickSignUp();

            registerPage.elements.errorMessage().should("be.visible").and("contain", "Username has already been taken");
            // cy.visualSnapshot("Display sign up already taken error");
        });

        it('should display error for taken email', () => {
            registerPage.typeUsername(userNotExisting.username);
            registerPage.typeEmail(userExisting.email);
            registerPage.typePassword(userNotExisting.password);
            registerPage.clickSignUp();

            registerPage.elements.errorMessage().should("be.visible").and("contain", "Email has already been taken");
        });
    });

    context('Sign in', () => {

        beforeEach(() => {
            loginPage.navigate();
        });

        it('should be able to login and logout', () => {
            cy.contains("Need an account?").should('have.attr', 'href', '#/register');

            loginPage.typeEmail(userExisting.email);
            loginPage.typePassword(userExisting.password);
            loginPage.clickSignIn();

            cy.location("pathname").should("equal", "/");
            homePage.navBar.elements.navItems().should("contain", userExisting.username);
            
            homePage.navBar.clickNavBarItem("Logout");
            homePage.navBar.elements.navItems().should("not.contain", userExisting.username);
        });

        it('should display login validation errors', () => {
            loginPage.typeEmail(userNotExisting.email);
            loginPage.elements.emailInput().clear().blur();

            loginPage.elements.validationMessage("email").should("be.visible").and("contain", "Email is required");

            loginPage.typePassword(userNotExisting.password);
            loginPage.elements.passwordInput().clear().blur();

            loginPage.elements.validationMessage("password").should("be.visible").and("contain", "Password is required");

            loginPage.typePassword("abc");
            loginPage.elements.validationMessage("password").should("be.visible").and("contain", "Password must have a minimum 4 characters");

            // cy.visualSnapshot("Display sign up required errors");

            wrongEmailFormat.forEach((email) => {
                loginPage.elements.emailInput().clear();
                loginPage.typeEmail(email);

                loginPage.elements.validationMessage("email").should("be.visible").and("contain", "Incorrect email format");
            });
        });

        it('should display error for invalid user', () => {
            loginPage.typeEmail("invalid@email.com");
            loginPage.typePassword("invalidPassword");
            loginPage.clickSignIn();

            loginPage.elements.errorMessage().should("be.visible").and("contain", "Email or password is invalid");
            // cy.visualSnapshot("Display sign in invalid user error");
        });

        it('should display error for existing user when invalid password', () => {
            loginPage.typeEmail(userExisting.email);
            loginPage.typePassword("invalidPassword");
            loginPage.clickSignIn();

            loginPage.elements.errorMessage().should("be.visible").and("contain", "Email or password is invalid");
        });
    });
});