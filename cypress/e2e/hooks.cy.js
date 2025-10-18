describe('Hooks', () => {

    before(() => {
        cy.log('This runs once before all tests in the block');
    });

    beforeEach(() => {
        cy.log('This runs before each test in the block');
    });


    afterEach(() => {
        cy.log('This runs after each test in the block');
    });

    after(() => {
        cy.log('This runs once after all tests in the block');
    });

    it('Test 1', () => {
        cy.log('Executing Test 1');
    });

    it('Test 2', () => {
        cy.log('Executing Test 2');
    });

});