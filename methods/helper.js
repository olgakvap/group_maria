const {registerUser, registerActivation, userLoginAPI} = require("./axios.methods");


async function clearInputValue(element){
    while(await element.getValue() !== ''){
        await element.doubleClick();
        element.keys("Delete");
    }
}

async function creatAndLoginAPI(email, password){
    const userCreateRes = await registerUser(email, password)
    if(userCreateRes.errors) console.log(userCreateRes.errors)

    const userActivateRes = await registerActivation(userCreateRes.activationLinkId)
    if(userActivateRes.errors) console.log(userActivateRes.errors)

    const userLoginRes = await userLoginAPI(email, password)
    if(userLoginRes.errors) console.log(userLoginRes.errors)

    return userLoginRes.accessToken;
}

module.exports = {
    clearInputValue,
    creatAndLoginAPI
}
