import { faker } from "@faker-js/faker"

describe('Authorization', () => {

  it('Should redirect unauthenticated user to home page', () => {
    cy.visit("/settings");
    cy.location("hash").should("equal", "#/");
  });

  context('Register', () => {

    it('Should redirect to home page after registering, as logged in', () => {
      const username = faker.internet.username();
      const email = faker.internet.email();
      const password = faker.internet.password();
      cy.visit('/register');
      cy.getByTestId("username-input").type(username);
      cy.getByTestId("email-input").type(email);
      cy.getByTestId("password-input").type(password);
      cy.getByTestId("signup-btn").click();
      cy.location("hash").should("equal", "#/")
      cy.getByTestId("nav-item").should("contain", username);
    });

    it('Should display error for taken username', () => {
      cy.visit('/register');
      cy.getByTestId("username-input").type("foofoofoo");
      cy.getByTestId("email-input").type("foofoofoo@foo.cl");
      cy.getByTestId("password-input").type("password");
      cy.getByTestId("signup-btn").click();
      cy.getByTestId("error-message").should("be.visible").and("have.text", "Username has already been taken");
    });

    it('Should display error for taken email', () => {
      const username = faker.internet.username();
      cy.visit('/register');
      cy.getByTestId("username-input").type(username);
      cy.getByTestId("email-input").type("foofoofoo@foo.cl");
      cy.getByTestId("password-input").type("password");
      cy.getByTestId("signup-btn").click();
      cy.getByTestId("error-message").should("be.visible").and("have.text", "Email has already been taken");
    });

  });

});