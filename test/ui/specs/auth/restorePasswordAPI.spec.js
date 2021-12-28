const { registerUser, registerActivation, userLoginAPI, userLogoutAPI, userPasswordResetRequest } = require("../../../helpers/axios.methods"); //import method here

describe('RESTORE PASSWORD PAGE', () => {

    let result = null;
    const testEmail = `testUser${Date.now()}@gmail.com`;
    let testPassword = 'testUser1234!'


    it('API - registration', async () => {
        result = await registerUser(testEmail, testPassword);
        console.log(result)
        expect(!!result.activationLinkId).toBe(true);
    });

    it('API - user activation', async () => {
        result = await registerActivation(result.activationLinkId)
        console.log(result)
        expect(result.activationString).toHaveText("Activation Successful!")
    });

    it('API - user login', async () => {
        result = await userLoginAPI(testEmail, testPassword)
        console.log(result)
        expect(!!result.accessToken).toBe(true);
    });

    it('API - user logout', async () => {
        result = await userLogoutAPI();
        console.log(result)
        expect(result.logoutBoolean).toBe(true);
    });

    it('API - restore password request', async () => {
        result = await userPasswordResetRequest(testEmail, result.accessToken);
        console.log(result)
        expect(result.resetPasswordString).toHaveText(`Password reset email sent to ${testEmail}, if such user exists`);
    });

});

