const LoginPage = require('../../pageobjects/auth/Login.page');
const ProfilePage = require('../../pageobjects/user/Profile.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const {clearInputValue, randomString} = require('../../../helpers/uiMethods.helper');
const ProfileEditPage = require('../../pageobjects/user/ProfileEdit.page');

describe('View Profile Page', () => {

    before('User Should Log In with Valid Credentials', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('PP - 03: Should Display Full name', async () => {
        await PublicationsPage.navBar.openProfile();
        await ProfilePage.userFirstLastName.waitForDisplayed({timeout: 5000});
        await expect(ProfilePage.userFirstLastName).toBeDisplayed();
    });

    it('PP - 01: Should Check default image on Profile page (no uploaded image)', async () => {

        await PublicationsPage.navBar.openProfile();
        await ProfilePage.btnEdit.click();
        await clearInputValue(ProfileEditPage.inputExternalLinkToProfileImage);
        await clearInputValue(ProfileEditPage.inputFirstName);
        await ProfileEditPage.inputFirstName.setValue('Maria');
        await clearInputValue(ProfileEditPage.inputLastName);
        await ProfileEditPage.inputLastName.setValue('Jones');
        await ProfileEditPage.btnSave.click();
        await expect(ProfilePage.userInitials).toHaveText('MJ');
    });

    it('PP - 02: Should Verify that Profile page is not available for non-authorized user', async () => {
        await PublicationsPage.navBar.openProfile();
        const url = await browser.getUrl();
        await ProfilePage.navBar.logout();
        await browser.url(url);
        await browser.waitUntil(async () => {
            let pageUrl = await browser.getUrl();
            return pageUrl.indexOf('login') > -1
        }, 5000);
        const redirectedUrl = await browser.getUrl();
        await expect(redirectedUrl).toEqual('https://enduring.netlify.app/login');
    });

    it('PP - 04: Should Display Job title', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        await PublicationsPage.navBar.openProfile();
        await expect(ProfilePage.userJobTitle).toBeDisplayed();
    });

    it('PP - 05: Should Display Email', async () => {
        await PublicationsPage.navBar.openProfile();
        await expect(ProfilePage.userEmail).toBeDisplayed();
    });

    it('PP - 06: Should Show Description (About me)', async () => {
        await PublicationsPage.navBar.openProfile();
        const aboutRandom = await randomString(100);
        await ProfilePage.btnEdit.click();
        await ProfileEditPage.fillAndSave(undefined,undefined,undefined,undefined, aboutRandom);
        await expect(ProfilePage.userAboutValue).toHaveText(`About: ${aboutRandom}`);
    });
//Todo: ask what to do with userAboutValue selector, it is working but in a weird way
});


