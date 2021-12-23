const LoginPage = require('../pageobjects/Login.page');
const ViewProfilePage = require('../pageobjects/ViewProfile.page');
const EditProfilePage = require('../pageobjects/EditAccountProfile.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const faker = require('faker');

describe('Edit User Profile', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Should Edit and Save User First and Last Name', async () => {
        const newFirstName = faker.name.firstName();
        const newLastName = faker.name.lastName();
        const newJobTitle = faker.name.jobTitle();
        await PublicationsPage.navBar.openProfile();
        await ViewProfilePage.btnEdit.click();
        await EditProfilePage.fillAndSave(newFirstName,newLastName,newJobTitle);

        expect(await ViewProfilePage.userFirstLastName.toBeExisting().true);

    });

});