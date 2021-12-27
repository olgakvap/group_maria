module.exports = class NavBar {
    get pageTitle() { return $('h6'); }
    get btnHamburgerMenu() { return $("//button[@id='nav-bar-toggle']"); }
    get btnProblems() { return $('#problems'); }
    get btnProfile() { return $("#profile"); }
    get btnPeople() { return $("#people"); }
    get logoutBtn() { return $("//span[.='Logout']"); }

    async openProblems() {
        await (await this.btnHamburgerMenu).click();
        await (await this.btnProblems).click();
    }

    async openProfile() {
        await (await this.btnHamburgerMenu).click();
        await (await this.btnProfile).click();
    }
    async logout() {
        await (await this.btnHamburgerMenu).click();
        await (await this.logoutBtn).click();
    }

    async openPeople() {
        await (await this.btnHamburgerMenu).click();
        await (await this.btnPeople).click();
    }
}
