const axios = require('axios');
const API_BASE_URL = 'https://enduring-server.herokuapp.com/v3/graphql';

const buildConfig = (data) => {
  return {
    method: 'post',
    url: API_BASE_URL,
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  };
};

const userRegister = async (email , password) => {
  const queryData = JSON.stringify({
    query: `mutation Registration($email: String!, $password: String!) {
      userCreate(email: $email, password: $password)
    }`,
    variables: {
      "email": email,
      "password": password,
    },
  });
  const {data}  = await axios(buildConfig(queryData));

  if (data.errors) {
    return { errors: data.errors };
  } else {
    const activationLink = data.data.userCreate;
    return { activationLink};
  }
};

const userActivate = async (activationLinkId) => {
  const queryData = {
    query: `mutation UserActivate($activationLinkId: String!) {
      userActivate(activationLinkId: $activationLinkId)
    }`,
    variables: { activationLinkId: activationLinkId },
  };

  const { data }  = await axios(buildConfig(JSON.stringify(queryData)));

  if (data.errors) {
    return { errors: data.errors };
  } else {
    const activationMessage = data.data.userActivate;
    return { activationMessage};
  }
};

// const runRequests = async () => {
//   let res = await userRegister(`testUser${Date.now()}@gmail.com`, 'testUser1234!');
//   console.log(res.activationLink);
//   res = await userActivate("61c15f4f3593d550165a3010");
//   console.log(res.message);
// }
//
// runRequests();

module.exports = {
  userRegister,
  userActivate,
};
