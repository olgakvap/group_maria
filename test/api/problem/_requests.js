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

const getProblems = (accessToken) => {
  const data = {
    query: `query problems ($offset: Int, $limit: Int) {
        problems (offset: $offset, limit: $limit) {
            _id
            title
            content
            jobTitle
        }
    }`,
    variables: {"offset":0,"limit":1000},
  };
  return axios(buildConfig(data, accessToken));
};

module.exports = {
  getProblems,
};
