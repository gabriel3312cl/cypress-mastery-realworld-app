export const getByTestId = (testId: string): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(`[data-testid="${testId}"]`);
}

Cypress.Commands.add('getByTestId', getByTestId);