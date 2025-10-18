describe('Selecting elements', () => {
    it('select by class, id, attr', () => {

        cy.visit('/register');

        // select by class
        cy.get(".form-control")

        // select by id
        //cy.get("#username")

        // select by attr
        cy.get("[data-testid=username-input]")

    });
});