const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const expected = require('../../../data/expected.json');

describe('Checking logout feature', () => {

    it ('Should navigated to Login page with all cleared fields after logout', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

        await PublicationsPage.navBar.btnHamburgerMenu.waitForDisplayed(3000);
        await PublicationsPage.navBar.logout();

        await LoginPage.inputEmail.waitForDisplayed(3000);

        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toEqual(process.env.BASE_URL + LoginPage.path);

        const expectedPage = await LoginPage.inputEmail;
        await expect(await expectedPage.getText()).toEqual("");
    });

    it('Should stays logged out in all browser tabs', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

        await PublicationsPage.navBar.btnHamburgerMenu.waitForDisplayed(3000);
        await PublicationsPage.navBar.logout();

        await browser.newWindow( process.env.BASE_URL)
        console.log(await browser.getTitle());

        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        await browser.closeWindow();
        await browser.switchToWindow(handles[1]);

        await browser.newWindow( process.env.BASE_URL);

        await LoginPage.inputEmail.waitForDisplayed(3000);

        const currentUrl = await browser.getUrl(); // promise is awaited, result is a string.
        console.log(`current url = ${currentUrl}`);

        await expect(currentUrl).toEqual(process.env.BASE_URL + LoginPage.path);

        const expectedPage = await LoginPage.inputEmail;
        await expect(await expectedPage.getText()).toEqual("");
    });

    it('Should stays logged out and navigated to empty Login page after clicking on back browser button ', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

        await PublicationsPage.navBar.btnHamburgerMenu.waitForDisplayed(3000);
        await PublicationsPage.navBar.logout();
        await browser.back();

        await LoginPage.pageTitle.waitForDisplayed(3000);
        const currentUrl = await browser.getUrl(); // promise is awaited, result is a string.
        console.log(`current url = ${currentUrl}`);

        await expect(currentUrl).toEqual(process.env.BASE_URL + LoginPage.path);
        await expect(await LoginPage.inputEmail.getText()).toEqual("");

    });
});


