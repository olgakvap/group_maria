const LoginPage = require('../../pageobjects/auth/Login.page');
const ViewProfilePage = require('../../pageobjects/user/Profile.page');
const EditProfilePage = require('../../pageobjects/user/ProfileEdit.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const {clearInputValue} = require('../../../helpers/uiMethods.helper');

describe('Checking Input Fields Limit Negative Tests', () => {

    before('Login with Existing User', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    })

    beforeEach('Open user profile page', async() => {
        await PublicationsPage.navBar.openProfile();
        await ViewProfilePage.btnEdit.click();
    });

    it('First Name Max Length Validation (35 characters)', async () => {
        await clearInputValue(await EditProfilePage.inputFirstName);
        await EditProfilePage.inputFirstName.setValue('I wish you a Merry Christmas and a Happy New Year!');
        await EditProfilePage.btnSave.click();
        await expect(EditProfilePage.errorMessage).toHaveText('ValidationError: firstName: Max length is 35 characters');

    });

    it('Last Name Max Length Validation (35 characters)', async () => {
        await clearInputValue(await EditProfilePage.inputLastName);
        await EditProfilePage.inputLastName.setValue('I wish you a Merry Christmas and a Happy New Year!');
        await EditProfilePage.btnSave.click();
        await expect(EditProfilePage.errorMessage).toHaveText('ValidationError: lastName: Max length is 35 characters');

    });

    it('Job Title Max Length Validation (255 characters)', async () => {
        await clearInputValue(await EditProfilePage.inputJobTitle);
        await EditProfilePage.inputJobTitle.setValue("Oh the weather outside is frightful, But the fire is so delightful, And since we've no place to go, Let It Snow! Let It Snow! Let It Snow!It doesn't show signs of stopping, And I've bought some corn for popping, The lights are turned way down low, Let It!!!");
        await EditProfilePage.btnSave.click();
        await expect(EditProfilePage.errorMessage).toHaveText('ValidationError: jobTitle: Max length is 255 characters');

    });

    it('First Name and Last Name Max Length Validation', async () => {
        await clearInputValue(await EditProfilePage.inputFirstName);
        await EditProfilePage.inputFirstName.setValue('I wish you a Merry Christmas and a Happy New Year!');
        await clearInputValue(await EditProfilePage.inputLastName);
        await EditProfilePage.inputLastName.setValue('I wish you a Merry Christmas and a Happy New Year!');
        await EditProfilePage.btnSave.click();
        await expect(EditProfilePage.errorMessage).toHaveText('ValidationError: firstName: Max length is 35 characters, lastName: Max length is 35 characters');

    });

    it('Should Show Error Message for All Fields', async () => {
        await clearInputValue(await EditProfilePage.inputFirstName);
        await EditProfilePage.inputFirstName.setValue('I wish you a Merry Christmas and a Happy New Year!');
        await clearInputValue(await EditProfilePage.inputLastName);
        await EditProfilePage.inputLastName.setValue('I wish you a Merry Christmas and a Happy New Year!');
        await clearInputValue(await EditProfilePage.inputJobTitle);
        await EditProfilePage.inputJobTitle.setValue("Oh the weather outside is frightful, But the fire is so delightful, And since we've no place to go, Let It Snow! Let It Snow! Let It Snow!It doesn't show signs of stopping, And I've bought some corn for popping, The lights are turned way down low, Let It!!!");
        await clearInputValue(await EditProfilePage.inputExternalLinkToProfileImage);
        await EditProfilePage.inputExternalLinkToProfileImage.setValue("Oh the weather outside is frightful, But the fire is so delightful, And since we've no place to go, Let It Snow! Let It Snow! Let It Snow!It doesn't show signs of stopping, And I've bought some corn for popping, The lights are turned way down low, Let It!!!");
        await clearInputValue(await EditProfilePage.inputAbout);
        await EditProfilePage.inputAbout.setValue('"Oh the weather outside is frightful, But the fire is so delightful, And since weve no place to go, Let It Snow! Let It Snow! Let It Snow!It doesnttt show signs of stopping, And Ive bought some corn for popping, The lights are turned way down low, Let It!!!"');
        await EditProfilePage.btnSave.click();
        await expect(EditProfilePage.errorMessage).toHaveText('ValidationError: firstName: Max length is 35 characters, lastName: Max length is 35 characters, about: Max length is 255 characters, image: Max length is 255 characters, jobTitle: Max length is 255 characters');
    });

});
