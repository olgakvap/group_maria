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
    companyCreate (data: $data) {
        _id
        title
        description
        image
        link
        problems {
            _id
            title
            content
            company {
                _id
                title
                description
                image
                link
                problems {
                    _id
                    title
                    content
                    jobTitle
                    solutions {
                        _id
                        problemId
                        content
                        complexity
                        createdAt
                        updatedAt
                    }
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
            }
            jobTitle
            solutions {
                _id
                problemId
                content
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
                complexity
                createdAt
                updatedAt
            }
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
    }
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
