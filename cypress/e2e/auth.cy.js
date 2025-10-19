import { faker } from "@faker-js/faker"
import standardUser from '../fixtures/users/standard.json';

describe('Authorization', () => {

  it('Should redirect unauthenticated user to home page', () => {
    cy.visit("/settings");
    cy.location("hash").should("equal", "#/");
  });

  context('Register', () => {

    beforeEach(() => {
      cy.visit('/register');
    });

    it('Should display correct link to login page', () => {
      cy.contains("Sign in to your account").should("be.visible").and("have.attr", "href", "#/login");
    });

    it('Should redirect to home page after registering, as logged in', () => {
      const username = faker.internet.username();
      const email = faker.internet.email();
      const password = faker.internet.password();
      //cy.visit('/register');
      cy.getByTestId("username-input").type(username);
      cy.getByTestId("email-input").type(email);
      cy.getByTestId("password-input").type(password);
      cy.getByTestId("signup-btn").click();
      cy.location("hash").should("equal", "#/")
      cy.getByTestId("nav-item").should("contain", username);
    });

    it('Should display error for taken username', () => {
      //cy.visit('/register');
      cy.getByTestId("username-input").type(standardUser.username);
      cy.getByTestId("email-input").type("foofoofoo@foo.cl");
      cy.getByTestId("password-input").type("password");
      cy.getByTestId("signup-btn").click();
      cy.getByTestId("error-message").should("be.visible").and("have.text", "Username has already been taken");
    });

    it('Should display error for taken email', () => {
      const username = faker.internet.username();
      //cy.visit('/register');
      cy.getByTestId("username-input").type(username);
      cy.getByTestId("email-input").type(standardUser.email);
      cy.getByTestId("password-input").type("password");
      cy.getByTestId("signup-btn").click();
      cy.getByTestId("error-message").should("be.visible").and("have.text", "Email has already been taken");
    });

    it('should display register form validation errors', () => {

      const wrongEmailFormat = [
        "plainaddress",
        "@missingusername.com",
        "email.domain.com",
        "username@com",
      ];

      cy.getByTestId("username-input").type("Jon Snow");
      cy.getByTestId("username-input").clear().blur();
      cy.getByTestId("username-validation-msg").should("be.visible").and("have.text", "Username is required");

      cy.getByTestId("email-input").type("jonsnow@winterfell.com");
      cy.getByTestId("email-input").clear().blur();
      cy.getByTestId("email-validation-msg").should("be.visible").and("have.text", "Email is required");

      cy.getByTestId("password-input").type("JonSnow333");
      cy.getByTestId("password-input").clear().blur();
      cy.getByTestId("password-validation-msg").should("be.visible").and("have.text", "Password is required");

      cy.getByTestId("password-input").type("abc");
      cy.getByTestId("password-validation-msg").should("be.visible").and("have.text", "Password must have a minimum 4 characters");

      wrongEmailFormat.forEach((email) => {
        cy.getByTestId("email-input").clear();
        cy.getByTestId("email-input").type(email);
        cy.getByTestId("email-validation-msg").should("be.visible").and("have.text", "Incorrect email format");
      });

    });

  });

  context('Login', () => {

    beforeEach(() => {
      cy.visit('/login');
    });

    it('Should display correct link to register page', () => {
      cy.contains("Need an account?").should("be.visible").and("have.attr", "href", "#/register");
    });

    it('Should be able to login and logout', () => {

      cy.getByTestId("email-input").type(standardUser.email);
      cy.getByTestId("password-input").type(standardUser.password);
      cy.getByTestId("signin-btn").click();

      cy.location("hash").should("equal", "#/")
      cy.getByTestId("nav-item").should("contain", standardUser.username);

      cy.getByTestId("nav-item").last().click();
      cy.getByTestId("dropdown-item").contains("Logout").click();

      cy.location("hash").should("equal", "#/");
      cy.getByTestId("nav-item").should("not.contain", standardUser.username);

    });

    it('Should display error for not existing user', () => {

      cy.getByTestId("email-input").type("null@null.cl");
      cy.getByTestId("password-input").type("invalidPassword");
      cy.getByTestId("signin-btn").click();
      cy.getByTestId("error-message").should("be.visible").and("have.text", "Email or password is invalid");

    });

    it('Should display error for existing user when invalid password', () => {

      cy.getByTestId("email-input").type(standardUser.email);
      cy.getByTestId("password-input").type("invalidPassword");
      cy.getByTestId("signin-btn").click();
      cy.getByTestId("error-message").should("be.visible").and("have.text", "Email or password is invalid");

    });

  });

});