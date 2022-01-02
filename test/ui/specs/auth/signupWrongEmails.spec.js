const SignupPage = require('../../pageobjects/auth/Singup.page');
//by the way, we have the name of the page Singup.page, I think it should be Signup.page
const incorrectEmail = [
    'mysite.ourearth.com',
    'mysite@.com.my',
    '@you.me.net',
    'mysite123@gmail.b',
    'mysite@.org.org',
    '.mysite@mysite.org',
    'mysite()*@gmail.com',
    'mysite..1234@yahoo.com'
];

describe('Checking Wrong Emails', () => {

    before('Open Signup Page', async () => {
        await SignupPage.open();
     });

    it('Should Show Error Message When Wrong Email Entered', async () => {
        for (let email of incorrectEmail){
        await SignupPage.inputEmail.setValue(email);
        await browser.keys("Tab");
        await expect(SignupPage.emailErrorMessage).toHaveText('Email validation error');
        }
    });

});
