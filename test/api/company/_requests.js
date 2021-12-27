const axios = require('axios');
const API_URL = 'https://enduring-server.herokuapp.com/v3/graphql';

const buildConfig = (data, accessToken) => {
  return {
    method: 'post',
    url: API_URL,
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    data: JSON.stringify(data),
  };
};

const companyDelete = (companyId, accessToken) => {
  const data = {
    query: `mutation companyDelete ($companyId: ID!) {
        companyDelete (companyId: $companyId)
    }`,
    variables: {
      'companyId': companyId
    },
  };
  return axios(buildConfig(data, accessToken));
};

module.exports = {
  companyDelete,
};
