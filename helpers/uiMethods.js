// async function clearInput5(element) {
//   const textLength = (await element.getValue()).length;
//   for (let i = 0; i < textLength; i++) {
//     await element.keys(['Backspace']);
//   }
// }

async function clearInput(element) {
    let valueLength = (await element.getValue()).length;
    let backSpaces = new Array(valueLength).fill('Backspace');
    await element.setValue(backSpaces);
}

async function clearInput2(element) {
    await element.doubleClick();
    await browser.keys("Delete");
}

async function clearInput3(element) {
    await element.click();
    await element.keys(['Meta', 'a']);
    await element.keys(['Backspace']);
}

module.exports = {
    clearInput,
    clearInput2,
    clearInput3,
};
