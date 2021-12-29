module.exports = class NavBar {
    get pageTitle() { return $('h6'); }
    get btnHamburgerMenu() { return $("//button[@id='nav-bar-toggle']"); }
    get btnPublications() { return $("#publications"); }
    get btnPeople() { return $("#people"); }
    get btnCompanies() { return $("#companies"); }
    get btnProblems() { return $('#problems'); }
    get btnProfile() { return $("#profile"); }
    get logoutBtn() { return $("//span[.='Logout']"); }

    async openPublications() {
        await (await this.btnHamburgerMenu).click();
        await (await this.btnPublications).click();
    }
    
    async openPeople() {
        await (await this.btnHamburgerMenu).click();
        await (await this.btnPeople).click();
    }
    
    async openCompanies() {
        await (await this.btnHamburgerMenu).click();
        await (await this.btnCompanies).click();
    }
    
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
}
