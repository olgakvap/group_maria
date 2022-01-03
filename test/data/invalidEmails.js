const invalidEmails = [
  'mysite.ourearth.com',
  'mysite@.com.my',
  '@you.me.net',
  'mysite124@gmail.b',
  'mysite@.org.org',
  '.mysite1@mysite.org',
  'mysite1()*@gmail.com',
  'mysite..12345@yahoo.com',
  'plainaddress',
  '#@%^%#$@#$@#.com', // [ None of the special characters in this local-part are allowed outside quotation marks]
  'email.example.com', //  [@ is not present]
  'email.@example.com',
  'email@example',
  'email@.example.com', // [ TLD (Top Level domain) can not start with dot "." ]
  'email@example..com',
];

module.exports = {
  invalidEmails,
};
