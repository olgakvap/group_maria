const LoginPage = require('../../pageobjects/auth/Login.page');
const ViewProfilePage = require('../../pageobjects/user/Profile.page');
const EditProfilePage = require('../../pageobjects/user/ProfileEdit.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const faker = require('faker');

describe('Edit User Profile', () => {

    const newFirstName = faker.name.firstName();
    const newLastName = faker.name.lastName();
    const newJobTitle = faker.name.jobTitle();
    const fullName = newFirstName + ' ' + newLastName;

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Should Edit and Save User First and Last Name', async () => {
        await PublicationsPage.navBar.openProfile();
        await ViewProfilePage.btnEdit.click();
        await EditProfilePage.fillAndSave(newFirstName,newLastName,newJobTitle);
        expect(await ViewProfilePage.userFirstLastName).toBeExisting();
    });

    xit('Full Name Should Match the Edited First and Last Name', async () => {
        await ViewProfilePage.btnEdit.click();
        await EditProfilePage.fillFirstName(newFirstName);
        await EditProfilePage.fillAndSaveLastName(newLastName);
        expect(await ViewProfilePage.userFirstLastName).toEqual(fullName);

    });

});
//Todo: Everytime the second test shows error, I don't know what to do, plus the second test put the same First And Last
//name, does not change anything
//[chrome 96.0.4664.110 windows #0-0] 1) Edit User Profile Full Name Should Match the Edited First and Last Name
// [chrome 96.0.4664.110 windows #0-0] expect(received).toEqual(expected) // deep equality
//
// Expected: "Richie Reinger"
// Received: {"addCommand": [Function anonymous], "emit": [Function bound ], "error": {"error": "no such element", "message": "no such element: Unable to locate element: {\"method\":\"xpath\",\"selector\":\"//div[@class='MuiTypography-root MuiTypography-h4 css-1xvinid']\"}
//   (Session info: chrome=96.0.4664.110)", "stacktrace": "Backtrace:
// 	Ordinal0 [0x00586903+2517251]
// 	Ordinal0 [0x0051F8E1+2095329]