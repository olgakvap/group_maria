const { getUserAuthData } = require("../api/auth/_requests");
require('dotenv').config();

exports.mochaGlobalSetup = async function() {
  let { accessToken } = await getUserAuthData(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  process.env.ADMIN_TOKEN = accessToken;
  console.log('******************************************');
  console.log('ADMIN_MAIL: ' + process.env.ADMIN_EMAIL);
  console.log('ADMIN_PASSWORD: ' + process.env.ADMIN_PASSWORD);
  console.log('ADMIN_TOKEN: ' + process.env.ADMIN_TOKEN);
  console.log('******************************************');
};
