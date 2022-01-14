const LoginPage = require("../../pageobjects/auth/Login.page");
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const UsersListPage = require('../../pageobjects/user/UsersList.page');
const UserViewPage = require('../../pageobjects/user/UserView.page');
const {createAndLoginAPI, updateUser, deleteUser} = require("../../../helpers/axios.methods");

describe('View User Card', () => {
    let userTest = {};
    let values = {};
    before('Create and Activate New User', async () => {
        userTest = await createAndLoginAPI(`TL${Date.now()}@gmail.com `, process.env.USER_PASSWORD);
        console.log(userTest);
        values = {
            "firstName": "Ivanna",
            "lastName": "Susanina",
            "jobTitle": "Tour Guide",
            "about": "Avid Traveler",
            "image": "https://sun6-20.userapi.com/s/v1/ig2/s99sWS3v8lIMj9EHN9mTmEwRizSafP03vvSZC4u3Lka9Q2fO6IhBaZf9HCtG9oGI8DXJAnoJFwD6Vqe0t1Nw4Iy2.jpg?size=400x0&quality=95&crop=3,0,397,497&ava=1",
            "languages": ["JavaScript"]
        };
        await browser.pause(10000);
        await updateUser(userTest.userID, values, userTest.accessToken);
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        await PublicationsPage.navBar.btnHamburgerMenu.click();
        await PublicationsPage.navBar.btnPeople.click();
        const userNameLink = await UsersListPage.findUserNameLinkByID(userTest.userID);
        await userNameLink.waitForDisplayed({timeout: 15000});
        await userNameLink.click();
        await UserViewPage.userImage.waitForDisplayed();
    });

    it('Should verify that User Card displays correct User', async () => {
        const expectedUserName = `${values.firstName} ${values.lastName}`;
        const userNameLabel = await UserViewPage.labelUserFirstLastName;
        const actualUserName = await userNameLabel.getText();
        await expect(actualUserName).toEqual(expectedUserName);
    });

    it('Should Verify that the Job Title is displayed as expected', async () => {
        const expectedUserJobTitle = `${values.jobTitle}`;
        const userJobTitleLabel = await UserViewPage.labelUserJobTitle;
        const actualUserJobTitle = await userJobTitleLabel.getText();
        await expect(actualUserJobTitle).toEqual(expectedUserJobTitle);
    });

    it('Should Verify that the User Languages field is displayed as expected', async () => {
        const expectedUserLanguages = `${values.languages}`;
        const userLanguagesLabel = await UserViewPage.labelUserLanguages;
        const actualUserLanguages = await userLanguagesLabel.getText();
        await expect(actualUserLanguages).toEqual(expectedUserLanguages);
    });

    it('Verify that the User About field is displayed as expected', async () => {
        await expect(UserViewPage.userAbout).toBeDisplayed();
        const expectedUserAbout = `About: ${values.about}`;
        const userAboutLabel = await UserViewPage.labelUserAbout;
        const actualUserAbout = await userAboutLabel.getText();
        await expect(actualUserAbout).toEqual(expectedUserAbout);
    });

    it('Verify that the User Level field is displayed', async () => {
        await expect(UserViewPage.userLevel).toBeDisplayed();
    });

    it('Verify that the User Stars Icons are displayed', async () => {
        await expect(UserViewPage.userLevelStarIcon).toBeDisplayed();
    });

    it('Verify that the User Image is displayed', async () => {
        await expect(UserViewPage.userImage).toBeDisplayed();
    });

    it('Verify that the Label Status (user/admin) is displayed', async () => {
        await expect(UserViewPage.labelStatus).toBeDisplayed();
    });

    it('Verify that the Back Arrow is displayed and is clickable', async () => {
        await expect(UserViewPage.goToUsersPage).toBeDisplayed();
        await expect(UserViewPage.goToUsersPage).toBeClickable();
    });

    after('CLEANUP', async () => {

        await deleteUser({userId: userTest.userID, accessToken: userTest.accessToken});

    });
});
