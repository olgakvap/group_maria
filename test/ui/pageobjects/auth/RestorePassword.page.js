const Page = require('../Page');

class RestorePasswordPage extends Page {
    get inputEmail() {
        return $('#email');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    get backToLoginButton() {
        return $("//a[@href='/login']");
    }

    get resetPasswordMessage() {
        return $('//div[@class=\'MuiAlert-message css-1w0ym84\']');
    }

    async restorePassword (email) {
        await this.open();
        await this.inputEmail.setValue(email);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('/passwordReset');
    }
}

module.exports = new RestorePasswordPage();