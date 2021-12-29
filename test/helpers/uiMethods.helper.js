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

module.exports = {
    clearInputValue,
    getValidationMessage
}
