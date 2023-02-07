export const selectDropdownValue = (
    InputElement: Cypress.Chainable<JQuery<HTMLElement>>,
    dropdownValue: string
): void => {
    InputElement.click();
    cy.getByTestId("dropdown-item").contains(dropdownValue).click();
}

Cypress.Commands.add("selectDropdownValue", selectDropdownValue);