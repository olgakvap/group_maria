const axios = require('axios');
const { buildConfig } = require('../../helpers/buildConfig');

const publicationsList = (accessToken) => {
  const data = {
    query: `query publications ($offset: Int, $limit: Int) {
        publications (offset: $offset, limit: $limit) {
            _id
            title
            description
            content
            image
            owner {
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
            likes {
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
            createdAt
            updatedAt
        }
    }`,
    variables: {
      offset: 0,
      limit: 0
    }
  };
  return axios(buildConfig(data, accessToken));
};

const publicationDelete = ( publicationID, accessToken) => {
  const data = {
    query: `mutation publicationDelete ($pubId: ID!) {
        publicationDelete (pubId: $pubId)
    }`,
    variables: {
      pubId: publicationID
    }
  };
  return axios(buildConfig(data, accessToken));
};

const publicationCreate = async (values, accessToken) => {
  const queryData = {
    query: `mutation publicationCreate ($values: PublicationInput) {
      publicationCreate (values: $values) {
          _id
          title
          description
          content
          image
      }
    }`,
    variables: {
      values: values
    },
  };
  return axios(buildConfig(queryData, accessToken));
};

module.exports = {
  publicationsList,
  publicationDelete,
  publicationCreate,
};
