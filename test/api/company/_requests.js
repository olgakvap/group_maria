const axios = require('axios');
const { buildConfig } = require('../../helpers/buildConfig');

const companyDelete = (companyId, accessToken) => {
  const data = {
    query: `mutation companyDelete ($companyId: ID!) {
        companyDelete (companyId: $companyId)
    }`,
    variables: {
      'companyId': companyId
    }
  };
  return axios(buildConfig(data, accessToken));
};

const companyCreate = ( title, description, image, link, accessToken ) => {
  const data = {
    query: `mutation companyCreate ($data: CompanyInput) {
      companyCreate (data: $data)
    }`,
    variables: {
      data:
        {
          title,
          description,
          image,
          link
        }
    }
  };
  return axios(buildConfig(data, accessToken));
};

module.exports = {
  companyDelete,
  companyCreate,
};
