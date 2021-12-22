const { userRegister, userActivate } = require("../../helpers/apiRequests"); //import method here

describe('LOGIN PAGE', () => {

  let result = null;


  it('API - registration', async () => {
    result = await userRegister(`testUser${Date.now()}@gmail.com`, 'testUser1234!');
    console.log(result)
    expect(!!result.activationLink).toBe(true);
  });

  it('API - user activation', async () => {
    result = await userActivate(result.activationLink)
    console.log(result)
    expect(result.activationMessage).toHaveText("Activation Successful!")
  });

});
