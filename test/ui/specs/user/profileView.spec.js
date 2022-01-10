const LoginPage = require('../../pageobjects/auth/Login.page');
const ProfilePage = require('../../pageobjects/user/Profile.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const {clearInputValue, randomString} = require('../../../helpers/uiMethods.helper');
const ProfileEditPage = require('../../pageobjects/user/ProfileEdit.page');

describe('View Profile Page', () => {

    before('User Should Log In with Valid Credentials', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Should display Full name and Job Title', async () => {
        await PublicationsPage.navBar.openProfile();
        await ProfilePage.userFirstLastName.waitForDisplayed({timeout: 5000});

        const temp = await ProfilePage.userFirstLastName;

        await expect(await temp.isDisplayed()).toBeTruthy();
        await expect(ProfilePage.userJobTitle).toBeExisting();
        await expect(ProfilePage.userEmail).toBeExisting();
    });

    it('PP-01: Should Check default image on Profile page (no uploaded image)', async () => {
//https://docs.google.com/spreadsheets/d/1Eg-BVQyju1YcKWL2vJYnRgLNliGOS7Vpn982QCOd1_s/edit#gid=2080765823&range=2:2
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

});


