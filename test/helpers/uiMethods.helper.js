async function clearInputValue(element){
    while(await element.getValue() !== '') {
        await element.doubleClick();
        element.keys("Delete");
    }
}

async function getValidationMessage(element){
    const requiredMessage = await browser.execute(`return document.getElementById("${element}").validationMessage`);
    return requiredMessage;
}

async function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+=-';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
    randomString
    clearInputValue,
    getValidationMessage
}
