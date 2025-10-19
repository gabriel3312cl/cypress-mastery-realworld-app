import admin from '../fixtures/users/admin.json';
import proUser from '../fixtures/users/pro.json';
import standardUser from '../fixtures/users/standard.json';

describe('Cypress core concepts', () => {

    it('Change viewport', () => {
        cy.viewport(1920, 1080);
        cy.visit('/');
        cy.viewport("macbook-13");
    });

    it('Global viewport', () => {
        cy.visit('/');
    });

    it('Retry-ability', () => {
        cy.visit('/');
        cy.get(".article-preview").find("h1").should("have.length", 3);
    });

    it('Timeout', () => {
        cy.visit('/');
        cy.get(".article-preview", { timeout: 10000 }).should("have.length", 3);
    });

    /*
    it('Selecting dropdown values', () => {
        cy.visit('/');

        // select by text
        cy.getByTestId("nav-dropdown-btn").select("Banana");
        cy.getByTestId("nav-dropdown-btn").find("option:selected").should("have.text", "Banana");

        // select by index
        cy.getByTestId("nav-dropdown-btn").select(2);
        cy.getByTestId("nav-dropdown-btn").find("option:selected").should("have.text", "Cherry");

        // select by value
        cy.getByTestId("nav-dropdown-btn").select("apple");
        cy.getByTestId("nav-dropdown-btn").find("option:selected").should("have.text", "Apple");

        cy.getByTestId("nav-dropdown-btn").click();
        cy.getByTestId("nav-dropdown-btn").contains("li", "1st menu item").click();
        // or
        cy.contains(".ant-dropdown-menu-item", "2nd menu item").click();


    });
    */

    it("Login as admin user", () => {
        cy.login(admin.email, admin.password);
        cy.visit("/");
        cy.getByTestId("nav-item").should("contain", admin.username);
    });

    it("Login as pro user", () => {
        cy.login(proUser.email, proUser.password);
        cy.visit("/");
        cy.getByTestId("nav-item").should("contain", proUser.username);
    });

    it("Login as standard user", () => {
        cy.login(standardUser.email, standardUser.password);
        cy.visit("/");
        cy.getByTestId("nav-item").should("contain", standardUser.username);
    });

    it('Task 1', () => {
        /*
        go to home page
        get date from first aticle for later use
        go to first article datails
        check if date in article details is the same as date on article preview
        */
        cy.visit('/');
        cy.get(".article-preview").eq(0).find(".date").invoke('text').then(($articleDate) => {
            cy.get(".article-preview").eq(0).contains("span", "Read more...").click();
            cy.get(".date").eq(0).should("have.text", $articleDate);
        });
    });

    it('Task 2', () => {
        /*
        go to home page
        from second article get "finances" and "technology" tags for later use
        go to second article details
        check if tags in article details match tags from article preview
        */
        cy.visit('/');
        cy.get(".article-preview").eq(1).find(".tag-pill").eq(0).invoke('text').then(($financesTag) => {

            cy.get(".article-preview").eq(1).find(".tag-pill").eq(1).invoke('text').then(($technologyTag) => {
                cy.get(".article-preview").eq(1).contains("span", "Read more...").click();
                cy.get(".tag-pill").eq(0).should("have.text", $financesTag);
            });
        });
    });


    it('Alias (Query, Static)', () => {
        cy.visit('/');

        cy.get(".article-preview").eq(1).as("secondArticle").find(".tag-pill").eq(0).invoke('text').as("financesTag", { type: "static" });
        cy.get("@secondArticle").find(".tag-pill").eq(1).invoke('text').as("technologyTag", { type: "static" });

        cy.get("@secondArticle").contains("span", "Read more...").click();

        cy.get("@financesTag").then(($financesTag) => {
            cy.get(".tag-pill").eq(0).should("have.text", $financesTag);
        });

        cy.get("@technologyTag").then(($technologyTag) => {
            cy.get(".tag-pill").eq(1).should("have.text", $technologyTag);
        });

    });

});