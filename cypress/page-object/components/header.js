class Header {

    elements = {
        navItems: () => cy.getByTestId('nav-item'),
        navItem: (index) => this.elements.navItems().eq(index),
        dropdownItems: () => cy.getByTestId('dropdown-item'),
    }

    logout() {
        this.elements.navItems().last().click();
        this.elements.dropdownItems().contains("Logout").click();
    }

}

export default Header;