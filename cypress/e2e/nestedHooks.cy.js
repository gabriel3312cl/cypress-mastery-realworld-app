describe('Nested Hooks', () => {

    beforeEach(() => {
        cy.log('Outer beforeEach - runs before each test in the outer block');
    });

    context('Inner Block 1', () => {

        beforeEach(() => {
            cy.log('Inner Block 1 beforeEach - runs before each test in Inner Block 1');
        });

        it('Test 1 in Inner Block 1', () => {
            cy.log('Executing Test 1 in Inner Block 1');
        });

        it('Test 2 in Inner Block 1', () => {
            cy.log('Executing Test 2 in Inner Block 1');
        });
    });

    context('Inner Block 2', () => {

        it('Test 1 in Inner Block 2', () => {
            cy.log('Executing Test 1 in Inner Block 2');
        });

        it('Test 2 in Inner Block 2', () => {
            cy.log('Executing Test 2 in Inner Block 2');
        });
    });

});