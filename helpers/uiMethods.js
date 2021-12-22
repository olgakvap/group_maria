// async function clearInput (element) {
//   const textLength = (await element.getValue()).length;
//   for (let i = 0; i < textLength; i++) {
//     await element.keys(['Backspace']);
//   }
// }

// async function clearInput(element) {
//     await element.click();
//     await element.keys(['Meta', 'a']);
//     await element.keys(['Backspace']);
// }

async function clearInput(element) {
    await element.doubleClick();
    element.keys('Delete');
}

module.exports = {
    clearInput
};
