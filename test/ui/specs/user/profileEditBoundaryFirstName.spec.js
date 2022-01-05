const SignupPage = require('../../pageobjects/auth/Signup.page');
const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const { createAndLoginAPI, deleteUser } = require('../../../helpers/axios.methods');
const Profile = require('../../pageobjects/user/Profile.page');
const EditProfile = require('../../pageobjects/user/ProfileEdit.page');
const { invalidInputLength } = require('../../../data/invalidInputLength');
const {clearInputValue} = require("../../../helpers/uiMethods.helper");
const EditProfilePage = require("../../pageobjects/user/ProfileEdit.page");

describe('Boundary Values Testing for First Name Input Field', () => {

    const invalidRandomLength = invalidInputLength;
    const email = `TestUser${Date.now()}@gmail.com`;
    const password = 'superUser123!';
    let userLoginRes;

    before('Create New User', async () => {
        userLoginRes = await createAndLoginAPI(email, password);
        await LoginPage.login(email, password);
        await PublicationsPage.navBar.openProfile();
        await Profile.btnEdit.click();
    });

    it('Should Show Error if First Name Length is More than 35 and Should Show No Error if Less than 35', async () => {
        await EditProfile.inputLastName.setValue('Smith');
        await browser.pause(1500);
        for (let i = 0; i <= 100; i++){
            let string = 'a'
            let firstNameInputValue = string.repeat(i);
            if (i == 0){
                await clearInputValue(await EditProfilePage.inputFirstName);
                await browser.pause(1500);
                await EditProfilePage.inputFirstName.setValue('');
                await browser.pause(1500);
                await EditProfilePage.btnSave.click();
                await browser.pause(1500);
                await expect(EditProfilePage.pageTitle).toHaveText('user');
                await browser.pause(1500);
                i++;
            }else if(i == 1 || i == 21 || i == 35){
                await clearInputValue(await EditProfilePage.inputFirstName);
                await browser.pause(1500);
                await EditProfilePage.inputFirstName.setValue(firstNameInputValue);
                await browser.pause(1500);
                await EditProfilePage.btnSave.click();
                await browser.pause(1500);
                await expect(Profile.btnEdit).toBeClickable();
                await browser.pause(1500);
                await Profile.btnEdit.click();
                await browser.pause(1500);
                i++;
            }else if(i == 36 || i == 100){
                await clearInputValue(await EditProfilePage.inputFirstName);
                await browser.pause(1500);
                await EditProfilePage.inputFirstName.setValue(firstNameInputValue);
                await browser.pause(1500);
                await EditProfilePage.btnSave.click();
                await browser.pause(1500);
                await expect(EditProfilePage.errorMessage).toHaveText('ValidationError: firstName: Max length is 35 characters');
                await browser.pause(1500);
                i++;
            }
        }
    });
//Todo: ask how to implement random number from invalidInputLength.js
    after('Delete the User', async () => {
        const userDeleteRes = await deleteUser({userId: userLoginRes.userID, accessToken: userLoginRes.accessToken});
    });

});