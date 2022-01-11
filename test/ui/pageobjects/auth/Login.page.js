const Page = require('../Page');

class LoginPage extends Page {
    path = '/login';

    get path() { return this.path; }
    get inputEmail() { return $('#email'); }
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('button[type="submit"]'); }
    get linkSignup() { return $('//a[contains(text(),"Sign Up")]'); }
    get linkRestorePassword() { return $("//a[@href='/passwordReset']");}
    get alertMsg() { return $('.MuiAlert-message'); }
    get activatedAlertMessage() { return $('.MuiAlert-message>div>div'); }
    get notActivatedAlertMessage() { return $('.MuiAlert-message>div>div'); }
    get pageTitle() { return $('//h3'); }

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
