const Page = require('../Page');

class SignupPage extends Page {

    get inputEmail() {
        return $('#email');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    get messageUserRegistered() {
        return $('//div[contains(text(),\'Registration successful!\')]');
    }

    get messageActivationLinkSent() {
        return $('//div[contains(text(),\'Activation link was sent to email\')]');
    }

    get emailErrorMessage() {
        return $('#email-helper-text');
    }

    get passwordErrorMessage() {
        return $('#password-helper-text');
    }

    userExistsErrorMessage(email) {
        return $(`//div[contains(text(),'User with ${email} already exist')]`);
    }

    async signup (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async signupWithoutSubmit (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
    }

    open() {
        return super.open('/signup');
    }
}

module.exports = new SignupPage();
