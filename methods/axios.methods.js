const axios = require('axios');
const API_URL = 'https://enduring-server.herokuapp.com/v3/graphql';


//USER REGISTER

async function registerUser(email, password) {

  const queryData = JSON.stringify({
    query: `mutation userCreate ($email: String!, $password: String!) {
                    userCreate (email: $email, password: $password)
                }`,
    variables: {"email": email, "password": password}
  });

  const {data} = await axios({
    method: 'post',
    url: API_URL,
    data: queryData,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (data.errors) {
    return {errors: data.errors}
  } else {
    const activationLinkId = data.data.userCreate;
    return {activationLinkId};
  }
}


//USER ACTIVATE


async function registerActivation(activationLinkId) {
  const queryData = JSON.stringify({
    query: `mutation userActivate ($activationLinkId: String!) {
        userActivate (activationLinkId: $activationLinkId)
}`,
    variables: {activationLinkId}
  });
  const {data} = await axios({
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
    const activationString = data.data.userActivate;
    return {activationString};
  }
}


//USER LOGIN

async function userLoginAPI(email, password) {
  const queryData = JSON.stringify({
    query: `query login ($email: String!, $password: String!) {
      login (email: $email, password: $password) {
        accessToken
      }
    }`,
    variables: {"email": email, "password": password}
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
    const accessToken = data.data.login.accessToken;
    return { accessToken };
  }
}


//COMPANY CREATE

async function createCompany(
  {
    title = 'Default Title',
    description = 'Default Description',
    accessToken
  }
  ) {
  const queryData = JSON.stringify({
    query: `mutation companyCreate ($data: CompanyInput) {
      companyCreate (data: $data)
    }`,
    variables: {
      data:
        {
          title,
          description
        }
    }
  });

  const { data } = await axios({
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
    const companyID = data.data.companyCreate;
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
      problemCreate (data: $data)
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

async function deleteProblem(problemID, accessToken){
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
    console.log('+++++++++++++++++++', data.errors)
    return {errors: data.errors}
  } else {
    const responseMsg = data.data.problemDelete;
    return responseMsg;
  }
}



module.exports = {
  registerUser,
  registerActivation,
  userLoginAPI,
  createCompany,
  createProblem,
  deleteProblem
}
// const runRequests = async () => {
//   let email = `testUser${Date.now()}@gmail.com`;
//   let password = 'testUser1234!';
//   let res = await registerUser(email, password);
//   console.log(res.activationLinkId);
//   res = await registerActivation(res.activationLinkId);
//   console.log(res.activationString);
//   res = await userLoginAPI(email, password);
//   console.log(res.accessToken);
//   let token = res.accessToken;
//   let companyID = await createCompany({title:'Company'+Date.now(),description: 'Maria',accessToken: res.accessToken});
//   console.log(companyID);
//   for (let i = 0; i < 11 ; i++) {
//     res = await createProblem({
//       title: 'New Problem' + Date.now(),
//       companyId: companyID,
//       jobTitle: 'Xperd',
//       accessToken: token
//     });
//     console.log(res);
//   }
//   //Todo Hardcode does not work, need to finish what we started, show must go on...
//   res = await deleteProblem('61c4e8276421378e73539849', token);
//   console.log(res);
// }
//
// runRequests();

