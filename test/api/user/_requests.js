const axios = require('axios');
const { buildConfig } = require('../../helpers/buildConfig');

const userDelete = (userId, accessToken) => {
  const data = {
    query: `mutation userDelete ($userId: ID!) {
        userDelete (userId: $userId)
    }`,
    variables: {
      "userId": userId
    },
  };
  return axios(buildConfig(data, accessToken));
};

const userUpdate = (userId, values, accessToken) => {
  const data = {
    query: `mutation userUpdate ($userId: ID!, $values: UserInput) {
    userUpdate (userId: $userId, values: $values)
    }`,
    variables: {
      "userId": userId,
      "values": values
    },
  };
  return axios(buildConfig(data, accessToken));
};

const getUsers = (accessToken) => {
  const data = {
    query: `query users {
    users {
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
    }`,
    variables: {}
  };
  return axios(buildConfig(data, accessToken));
};

module.exports = {
  userDelete,
  getUsers,
  userUpdate
};

