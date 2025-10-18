describe('Selecting elements', () => {
    
    it('Select by text - contains()', () => {
        cy.visit("/register");
        
        //cy.contains("Sign in to your account", { matchCase: false }).click();
        cy.contains("button", "Sign up");
        //cy.get("form").contains("button", "Sign up");
    });

    it('Select by text - contains() - test 2', () => {
        cy.visit("/");
        
        cy.contains("Read more...")
            .should("have.class", "preview-link")
            .children("h1")
            .should("have.text", "Lorem Ipsum 1");
    });

    it('Select by position in list', () => {
        cy.visit("/");

        cy.get(".article-preview")
            .should("have.length", 3)
            .eq(1)
            .should("contain", "Lorem Ipsum 2");

        cy.get(".article-preview")
            .eq(2)
            .should("contain", "Lorem Ipsum 3");

    });

    it('Find elements within set scope', () => {
        cy.visit("/");

        cy.get(".navbar").find(".nav-item");

        cy.get(".article-preview")
            .should("have.length", 3)
            .find("button")
            .should("have.length", 3);

    });

    it('Filter elements', () => {
        cy.visit("/");

        cy.get(".pagination")
            .find("li")
            .filter(".active");


        cy.get(".pagination")
            .find("li")
            .not(".active");

    });

    
    it('Filter elements by author', () => {
        cy.visit("/");

        cy.get(".article-preview")
            .find(".author")
            .filter(":contains('John Doe')")
            .should("have.length", 2);

    });
    
});