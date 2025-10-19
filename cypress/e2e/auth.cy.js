import RegisterPage from "../page-object/register-page";
import LoginPage from "../page-object/login-page";
import Header from "../page-object/components/header";
import { faker } from "@faker-js/faker"
import standardUser from '../fixtures/users/standard.json';

describe('Authorization', () => {
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const header = new Header();

  it('Should redirect unauthenticated user to home page', () => {
    cy.visit("/settings");
    cy.location("hash").should("equal", "#/");
  });

  context('Register', () => {

    beforeEach(() => {
      registerPage.visit();
    });

    it('Should display correct link to login page', () => {
      cy.contains("Sign in to your account").should("be.visible").and("have.attr", "href", "#/login");
    });

    it('Should redirect to home page after registering, as logged in', () => {
      const username = faker.internet.username();
      const email = faker.internet.email();
      const password = faker.internet.password();
      //cy.visit('/register');

      /*
      cy.getByTestId("username-input").type(username);
      cy.getByTestId("email-input").type(email);
      cy.getByTestId("password-input").type(password);
      cy.getByTestId("signup-btn").click();
      */

      registerPage.typeUsername(username);
      registerPage.typeEmail(email);
      registerPage.typePassword(password);
      registerPage.clickSignUpButton();

      cy.location("hash").should("equal", "#/")
      header.elements.navItems().should("contain", username);
    });

    it('Should display error for taken username', () => {
      registerPage.typeUsername(standardUser.username);
      registerPage.typeEmail("notExist@example.com");
      registerPage.typePassword("password");
      registerPage.clickSignUpButton();
      registerPage.elements.errorMessage().should("be.visible").and("have.text", "Username has already been taken");
    });

    it('Should display error for taken email', () => {
      const username = faker.internet.username();
      registerPage.typeUsername(username);
      registerPage.typeEmail(standardUser.email);
      registerPage.typePassword("password");
      registerPage.clickSignUpButton();
      registerPage.elements.errorMessage().should("be.visible").and("have.text", "Email has already been taken");
    });

    it('should display register form validation errors', () => {

      const wrongEmailFormat = [
        "plainaddress",
        "@missingusername.com",
        "email.domain.com",
        "username@com",
      ];

      registerPage.typeUsername("jon snow");
      registerPage.clearInput("username");
      registerPage.blurInput("username");
      registerPage.elements.validationMessage("username").should("be.visible").and("have.text", "Username is required");

      registerPage.typeEmail("jonsnow@example.com");
      registerPage.clearInput("email");
      registerPage.blurInput("email");
      registerPage.elements.validationMessage("email").should("be.visible").and("have.text", "Email is required");

      registerPage.typePassword("jon snow");
      registerPage.clearInput("password");
      registerPage.blurInput("password");
      registerPage.elements.validationMessage("password").should("be.visible").and("have.text", "Password is required");

      registerPage.typePassword("abc");
      registerPage.elements.validationMessage("password").should("be.visible").and("have.text", "Password must have a minimum 4 characters");

      wrongEmailFormat.forEach((email) => {
        registerPage.clearInput("email");
        registerPage.typeEmail(email);
        registerPage.elements.validationMessage("email").should("be.visible").and("have.text", "Incorrect email format");
      });

    });

  });

  context('Login', () => {

    beforeEach(() => {
      loginPage.visit();
    });

    it('Should display correct link to register page', () => {
      cy.contains("Need an account?").should("be.visible").and("have.attr", "href", "#/register");
    });

    it('Should be able to login and logout', () => {

      loginPage.typeEmail(standardUser.email);
      loginPage.typePassword(standardUser.password);
      loginPage.clickSignInButton();

      cy.location("hash").should("equal", "#/")
      header.elements.navItems().should("contain", standardUser.username);

      header.logout();

      header.elements.navItem(2)

      cy.location("hash").should("equal", "#/");
      header.elements.navItems().should("not.contain", standardUser.username);

    });

    it('Should display error for not existing user', () => {
      loginPage.typeEmail("notExisting@email.com");
      loginPage.typePassword("somePassword");
      loginPage.clickSignInButton();
      loginPage.elements.errorMessage().should("be.visible").and("have.text", "Email or password is invalid");

      /*
      cy.getByTestId("error-message").should("be.visible").and("have.text", "Email or password is invalid");
      cy.getByTestId("email-input").type("null@null.cl");
      cy.getByTestId("password-input").type("invalidPassword");
      cy.getByTestId("signin-btn").click();
      cy.getByTestId("error-message").should("be.visible").and("have.text", "Email or password is invalid");
      */

    });

    it('Should display error for existing user when invalid password', () => {

      loginPage.typeEmail(standardUser.email);
      loginPage.typePassword("somePassword");
      loginPage.clickSignInButton();
      loginPage.elements.errorMessage().should("be.visible").and("have.text", "Email or password is invalid");

      /*
      cy.getByTestId("email-input").type(standardUser.email);
      cy.getByTestId("password-input").type("invalidPassword");
      cy.getByTestId("signin-btn").click();
      cy.getByTestId("error-message").should("be.visible").and("have.text", "Email or password is invalid");
      */

    });

  });

});