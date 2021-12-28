// TODO: change to process.env.API_URL
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

module.exports = {
  buildConfig,
};
