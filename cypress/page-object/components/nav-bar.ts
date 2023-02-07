import userExisting from "../../fixtures/user-existing.json";


type ItemName =
    | "Home"
    | "New Article"
    | "Profile"
    | "Settings"
    | "Logout"

class NavBar {

    elements = {
        navItems: () => cy.getByTestId("nav-item")
    };

    clickNavBarItem(itemName: ItemName) {
        const navItemUnderDropdown = [
            itemName === "Profile",
            itemName === 'Settings',
            itemName === "Logout",
        ];

        if (navItemUnderDropdown.includes(true)) {
            cy.selectDropdownValue(this.elements.navItems().contains(userExisting.username), itemName);
        } else {
            this.elements.navItems().contains(itemName).click();
        }
    }

}

export default NavBar;