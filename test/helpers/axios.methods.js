const axios = require('axios');
const { getProblems } = require("../api/problem/_requests");
const { companyDelete } = require("../api/company/_requests");
const { userDelete, userUpdate } = require("../api/user/_requests");
const { userCreate, userActivate, userLogin } = require("../api/auth/_requests");
const { companyCreate } = require('../api/company/_requests');
const { publicationsList, publicationDelete, publicationCreate } = require("../api/publication/_requests");
const API_URL = 'https://enduring-server.herokuapp.com/v3/graphql';

//USER REGISTER

async function registerUser(email, password) {
  const { data } = await userCreate(email, password);

  if (data.errors) {
    return { errors: data.errors };
  } else {
    const activationLinkId = data.data.userCreate;
    return { activationLinkId };
  }
}

//USER ACTIVATE

async function registerActivation(activationLinkId) {
  const { data } = await userActivate(activationLinkId);

  if (data.errors) {
    return { errors: data.errors };
  } else {
    const activationString = data.data.userActivate;
    return { activationString };
  }
}

//USER LOGIN

async function userLoginAPI(email, password) {
  const { data } = await userLogin(email, password);

  if (data.errors) {
    return { errors: data.errors };
  } else {
    const accessToken = data.data.login.accessToken;
    const userID = data.data.login.user._id;
    return { accessToken, userID };
  }
}

// USER CREATE AND LOGIN

async function createAndLoginAPI(email, password){
  const userCreateRes = await registerUser(email, password);
  if(userCreateRes.errors) console.log(userCreateRes.errors);

  const userActivateRes = await registerActivation(userCreateRes.activationLinkId);
  if(userActivateRes.errors) console.log(userActivateRes.errors);

  const userLoginRes = await userLoginAPI(email, password);
  if(userLoginRes.errors) console.log(userLoginRes.errors);

  return userLoginRes;
}
// USER UPDATE

async function updateUser(userId, values, accessToken){
  const {data} = await userUpdate(userId, values, accessToken);
// console.log(data);
  if (data.errors) {
    return { errors: data.errors }
  } else {
    const responseMsg = data.data.userUpdate;
    return responseMsg;
  }
}



//COMPANY CREATE

async function createCompanyAndGetID({
    title = 'Default Title',
    description = 'Default Description',
    image = '',
    link = '',
    accessToken
  }) {

  const { data } = await companyCreate(title, description, image, link, accessToken);

  if (data.errors) {
    return {errors: data.errors}
  } else {
    const companyID = data.data.companyCreate._id;
    return companyID;
  }
}

//PROBLEM CREATE

async function createProblem(
  {
    title = 'Default Title',
    content = 'Default Content',
    companyId,
    jobTitle = 'Default engineer',
    accessToken
  }) {
  const queryData = JSON.stringify({
    query: `mutation problemCreate ($data: ProblemInput) {
    problemCreate (data: $data) {
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
                company {
                    _id
                    title
                    description
                    image
                    link
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
}`,
    variables: {
      data:
        {
          title,
          content,
          company: companyId,
          jobTitle,
        }
    }
  });

  const {data} = await axios({
    method: 'post',
    url: API_URL,
    data: queryData,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ accessToken }`
    }
  })

  if (data.errors) {
     console.log('+++++++++++++++++++', data.errors)
    return {errors: data.errors}
  } else {
    const responseMsg = data.data.problemCreate;
    return responseMsg;
  }
}

//PROBLEM Delete

async function deleteProblem( { problemID, accessToken }){
  const queryData  = JSON.stringify({
    query: `mutation ProblemDelete($problemId: ID!) {
  problemDelete(problemId: $problemId)
}`,
    variables: {
      problemId: problemID
    }
  });

  const {data} = await axios({
    method: 'post',
    url: API_URL,
    headers: {
      'Authorization': `Bearer ${ accessToken }`,
      'Content-Type': 'application/json'
    },
    data : queryData
  });
  if (data.errors) {
    return {errors: data.errors}
  } else {
    const responseMsg = data.data.problemDelete;
    return responseMsg;
  }
}

// FIND PROBLEM BY TITLE
async function findProblemByTitle(title, accessToken) {
  const { data } = await getProblems(accessToken);

  if (data.errors) {
    console.log('+++++++++++++++++++', data.errors)
    return {errors: data.errors}
  } else {
    const problem = data.data.problems.find(el => el.title === title);
    return problem;
  }
}

//PUBLICATION CREATE
async function createPublication(
  {
    title= "Default Title",
    description= "Test description",
    content= "Test Content",
    image = 'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg'
  },  accessToken) {

  const values = {
    title,
    description,
    content,
    image
  };

  const { data } = await publicationCreate(values, accessToken);
  if (data.errors) {
    return {errors: data.errors}
  } else {
    const publicationID = data.data.publicationCreate._id;
    return publicationID;
  }
}

// COMPANY Delete

async function deleteCompany( { companyID, accessToken }){
  const {data} = await companyDelete(companyID, accessToken);

  if (data.errors) {
    return { errors: data.errors }
  } else {
    const responseMsg = data.data.companyDelete;
    return responseMsg;
  }
}

// USER DELETE

async function deleteUser( { userId, accessToken }){
  const {data} = await userDelete(userId, accessToken);

  if (data.errors) {
    return { errors: data.errors }
  } else {
    const responseMsg = data.data.userDelete;
    return responseMsg;
  }
}

//USER LOGOUT API
async function userLogoutAPI() {
  const queryData = JSON.stringify({
    query: `query Logout {
  logout
  }`,
    variables: {}
  });

  const { data } = await axios({
    method: 'post',
    url: API_URL,
    data: queryData,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (data.errors) {
    return {errors: data.errors}
  } else {
    const logoutBoolean = data.data.logout;
    return { logoutBoolean };
  }
}

//USER PASSWORD RESET REQUEST

async function userPasswordResetRequest(email, accessToken) {
  const queryData = JSON.stringify({
    query: `mutation RestorePasswordRequest($email: String!) {
  userPasswordResetRequest(email: $email)
  }`,
    variables: {
      email,
      accessToken
    }
  });

  const {data} = await axios({
    method: 'post',
    url: API_URL,
    data: queryData,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })

  if (data.errors) {
    return {errors: data.errors}
  } else {
    const resetPasswordString = data.data.userPasswordResetRequest;
    return {resetPasswordString};
  }
}

const deleteUserPublications = async (userID, accessToken) => {
  const { data } = await publicationsList(accessToken);
  const publications = await data.data.publications.filter(el => el.owner !== null && el.owner._id === userID);

  for (let el of publications) {
    await publicationDelete(el._id, accessToken);
  }
};

module.exports = {
  registerUser,
  registerActivation,
  userLoginAPI,
  createAndLoginAPI,
  userPasswordResetRequest,
  createCompanyAndGetID,
  createProblem,
  deleteProblem,
  findProblemByTitle,
  createPublication,
  deleteCompany,
  deleteUser,
  userLogoutAPI,
  updateUser,
  deleteUserPublications
}
