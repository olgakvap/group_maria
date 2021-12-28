const chai = require('chai');
const expect = chai.expect;
const { userCreate } = require('./_requests');
const { getUsers } = require('../user/_requests');

describe('AUTH CONTROLLER - userCreate:', () => {
  it('creates user with valid required parameters #smoke', async () => {
    const newUserEmail = `testUser${Date.now()}@gmail.com`;
    const newUserPassword = 'testUser1234!';
    await userCreate(newUserEmail, newUserPassword).then( (res) => {
      expect(res.data.errors).to.be.undefined;
      expect(res.status).to.eq(200);
      expect(res.data).to.be.a('Object');
      expect(res.data.data.userCreate).to.be.a('string').that.is.not.empty;
    });

    // TODO: Check that users does not include the registered user
    // await getUsers(process.env.ADMIN_TOKEN).then((response) => {
    //   expect(response.data.data.users.map(el => el.email)).not.to.include(newUserEmail);
    // });
  });
});
