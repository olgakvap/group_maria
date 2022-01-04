const { registerUser, registerActivation } = require("../../../helpers/axios.methods"); //import method here

describe('LOGIN PAGE', () => {

  let result = null;


  it('API - registration', async () => {
    result = await registerUser(`testUser${Date.now()}@gmail.com`, 'testUser1234!');
    console.log(result)
    expect(!!result.activationLinkId).toBeTruthy();
  });

  it('API - user activation', async () => {
    result = await registerActivation(result.activationLinkId)
    console.log(result)
    expect(result.activationString).toHaveText("Activation Successful!")
  });

});
