const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-match'));
const { userCreate, userActivate, userLogin, getUserAuthData} = require('./_requests');
const { getUsers, userDelete} = require('../user/_requests');
const { invalidEmails } = require('../../data/invalidEmails');
const expected = require('../../data/expected.json');
const {use} = require("chai");

// INFO: THIS IS SAMPLE API TEST
describe('AUTH CONTROLLER - userCreate:', () => {
  it('Creates user with valid data #smoke', async () => {
    const newUserEmail = `testUser${Date.now()}@gmail.com`;
    console.log(newUserEmail);
    const newUserPassword = 'testUser1234!';

    // TODO: REMOVE UNNECESSARY VERIFICATION OF STATUS FOR GRAPHQL API
    const { data, headers, status } = await userCreate(newUserEmail, newUserPassword);

    // 1. CHECK RESPONSE
    expect(status).to.eq(200);
    expect(headers).to.have.deep.property('content-type', 'application/json; charset=utf-8');
    expect(data.errors).to.be.undefined;
    expect(JSON.stringify(data)).to.match(/{"data":{"userCreate":"(\w+)"}}/);
    // // ==============================================================================
    // expect(data.data).to.be.a('Object');
    // expect(data.data).to.haveOwnProperty('userCreate');
    // ==============================================================================
    const activationID = data.data.userCreate;
    expect(activationID).not.to.be.empty;


    // ======= OR USING THEN ========================================================
    //   await userCreate(newUserEmail, newUserPassword).then( (res) => {
    //         expect(res.data.errors).to.be.undefined;
    //         expect(res.status).to.eq(200);
    //         expect(res.data).to.be.a('Object');
    //         expect(res.data).to.haveOwnProperty('userCreate');
    //         expect(res.data.data.userCreate).to.be.a('string').that.is.not.empty;
    // });
    // ==============================================================================

    // 2. CHECK THAT USERS LIST DOES NOT INCLUDE NON-ACTIVATED USER
    await getUsers(process.env.ADMIN_TOKEN).then(res => {
      expect(res.data.errors).to.be.undefined;
      expect(res.data.data.users.map(el => el.email)).not.to.include(newUserEmail);
    });

    // 3. DELETE TEST USER - KLUDGE
    await userActivate(activationID).then( res => {
      expect(res.data.errors).to.be.undefined;
    });
    const { userID, accessToken } = await getUserAuthData(newUserEmail, newUserPassword);
    await userDelete(userID, accessToken).then(res => {
      expect(res.data.errors).to.be.undefined;
    });
  });

  invalidEmails.forEach((email) =>
    it(`Can not create a user with email in invalid format: ${email}`, async () => {
      await userCreate(email, 'testUser123!').then(function (res) {
        expect(res.data).to.haveOwnProperty('errors');
        expect(res.data.errors[0].message).contains(expected.auth.errors.INVALID_EMAIL);
      });
    }),
  );
});
