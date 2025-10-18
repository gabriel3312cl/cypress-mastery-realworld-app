import { faker } from "@faker-js/faker"

describe('Authorization', () => {

  context('Register', () => {
    it('Should redirect to home page after registering, as logged in', () => {

      // arrange - set up the application state
      // - prepare data
      const username = faker.internet.username();
      const email = faker.internet.email();
      const password = faker.internet.password();

      // - visit the register page
      cy.visit('/register');

      // act - query for an element and intercat with it
      // - type username
      cy.get("[data-testid=username-input]").type(username);
      // - type email
      cy.get("[data-testid=email-input]").type(email);
      // - type password
      cy.get("[data-testid=password-input]").type(password);
      // - click on sign up button
      cy.get("[data-testid=signup-btn]").click();
      
      //cy.wait(2000);

      // assert - check result in the application
      // - check if redirected to the home page
      // - check if registered user was logged in

      cy.location("hash").should("equal", "#/")
      cy.get("[data-testid=nav-item]").should("contain", username);

    });
  });

  context('Login', () => {
    it('Test 1', () => {

    });
  });

});