const axios = require('axios');
const { buildConfig } = require('../../helpers/buildConfig');

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
