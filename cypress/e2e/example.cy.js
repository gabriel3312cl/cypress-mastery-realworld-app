import HomePage from "../page-object/home-page";

describe("Home Page Tags", () => {
    const homePage = new HomePage();

    it("test", () => {
        cy.visit("/");
        homePage.elements.articleTags().should("be.visible");
    });
});