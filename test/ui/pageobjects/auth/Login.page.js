const Page = require('../Page');

class LoginPage extends Page {
    get inputEmail() { return $('#email'); }
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('button[type="submit"]'); }
    get signupButton() { return $('//a[contains(text(),"Sign Up")]'); }
    get alertMsg() { return $('.MuiAlert-message'); }
    get notActivatedAlertMessage() { return $('.MuiAlert-message>div>div'); }

    async login (email, password) {
        await this.open();
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('/login');
    }
}

module.exports = new LoginPage();
