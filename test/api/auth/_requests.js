const axios = require('axios');
const { buildConfig } = require('../../helpers/buildConfig');

const userCreate = (email, password) => {
  const data = {
    query: `mutation userCreate ($email: String!, $password: String!) {
                    userCreate (email: $email, password: $password)
                }`,
    variables: { email, password }
  };
  return axios(buildConfig(data));
};

const userActivate = (activationLinkId) => {
  const data = {
    query: `mutation userActivate ($activationLinkId: String!) {
        userActivate (activationLinkId: $activationLinkId)
    }`,
    variables: { activationLinkId }
  };
  return axios(buildConfig(data));
};

const userLogin = (email, password) => {
  const data = {
    query: `query login ($email: String!, $password: String!) {
      login (email: $email, password: $password) {
        accessToken
        user {
            _id
            email
            firstName
            lastName
            about
            image
            jobTitle
            level
            languages
            roles
            links
            starredProblems
            starredPublications
            lastAccess
            createdAt
            updatedAt
            isActivated
            activationLinkId
        }
      }
    }`,
    variables: { email, password }
  };
  return axios(buildConfig(data));
};

const getUserAuthData = async(email, password) => {
  const { data } = await userLogin(email, password);

  if (data.errors) {
    return { errors: data.errors };
  } else {
    const accessToken = data.data.login.accessToken;
    const userID = data.data.login.user._id;
    return { accessToken, userID };
  }
};

module.exports = {
  userCreate,
  userActivate,
  userLogin,
  getUserAuthData
};
