const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const { createAndLoginAPI, deleteUser } = require('../../../helpers/axios.methods');
const Profile = require('../../pageobjects/user/Profile.page');
const ProfileEdit = require('../../pageobjects/user/ProfileEdit.page');
const expected = require('../../../data/expected.json');

describe('Boundary Values Tests for First Name Input Field', () => {

    const email = `TestUser${Date.now()}@gmail.com`;
    const password = 'superUser123!';
    let userLoginRes;

    before('Create New User', async () => {
        userLoginRes = await createAndLoginAPI(email, password);
        await LoginPage.login(email, password);
    });

    beforeEach('Open Profile Edit Page', async() => {
        await PublicationsPage.navBar.openProfile();
        await Profile.btnEdit.click();
    });

    xit('Should Show Error if First Name Length is 0 Characters', async () => {
        await ProfileEdit.fillAndSave('');
        await expect(ProfileEdit.pageTitle).toHaveText('user');
    });

    it('Should Accept Valid Length 1 Character', async () => {
        let length1Name = 'J';
        let checkSavedName = length1Name + ' ' + 'Smith';
        await ProfileEdit.fillAndSave(length1Name,'Smith');
        await expect(Profile.userFirstLastName).toHaveText(checkSavedName);
    });

    it('Should Accept Valid Length 16 Characters', async () => {
        let length16Name = 'Chansokunthearie';
        let checkSavedName = length16Name + ' ' + 'Smith';
        await ProfileEdit.fillAndSave(length16Name,'Smith');
        await expect(Profile.userFirstLastName).toHaveText(checkSavedName);
    });

    it('Should Accept Valid Length 35 Characters', async () => {
        let length35Name = 'Kamakaleiimalamalamaiaikamakaleikam';
        let checkSavedName = length35Name + ' ' + 'Smith';
        await ProfileEdit.fillAndSave(length35Name,'Smith');
        await expect(Profile.userFirstLastName).toHaveText(checkSavedName);
    });

    it('Should Show Error if First Name Length is 36 Characters', async () => {
        let length36Name = 'Kamakaleiimalamalamaiaikamakaleikamq';
        await ProfileEdit.fillAndSave(length36Name,'Smith');
        await expect(ProfileEdit.errorMessage).toHaveText(expected.user.errors.FIRST_NAME_MAX_LENGTH);
    });

    after('Delete the User', async () => {
        const userDeleteRes = await deleteUser({userId: userLoginRes.userID, accessToken: userLoginRes.accessToken});
    });

});
