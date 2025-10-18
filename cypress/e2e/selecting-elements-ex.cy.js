describe('Selecting elements exercise', () => {
 
    it('Task 1', () => {
        cy.visit("/register");
 
        cy.contains("h1", "Sign up");
    });
 
    it('Task 2', () => {
        cy.visit("/");
 
        cy.get(".tag-list").find("button");
    });
 
    it('Task 3', () => {
        cy.visit("/");
 
        cy.get(".article-preview")
            .eq(1)
            .find(".tag-list")
            .contains("Finances");
    });
 
    it('Task 4', () => {
        cy.visit("/");
 
        cy.get(".article-preview")
            .find(".tag-pill")
            .filter(":contains('Finances')");
    });
 
});