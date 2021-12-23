module.exports = class NavBar {
    get pageTitle() { return $('h6'); }
    get btnHamburgerMenu() { return $("//button[@id='nav-bar-toggle']"); }
    get btnProblems() { return $('#problems'); }
    get btnProfile() { return $("#profile"); }
    get btnPeople() { return $("#people"); }
    get logoutBtn() { return $("//span[.='Logout']"); }

    async openProblems() {
        await this.btnHamburgerMenu.click();
        await this.btnProblems.click();
    }

    async openProfile() {
        await this.btnHamburgerMenu.click();
        await this.btnProfile.click();
    }
    async logout() {
        await this.btnHamburgerMenu.click();
        await this.logoutBtn.click();
    }

    async openPeople() {
        await this.btnHamburgerMenu.click();
        await this.btnPeople.click();
    }
}