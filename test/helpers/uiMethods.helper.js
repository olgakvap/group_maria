async function clearInputValue(element){
    while(await element.getValue() !== '') {
        await element.doubleClick();
        element.keys("Delete");
    }
}

module.exports = {
    clearInputValue,
}
