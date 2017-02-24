Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://meteorlensdundalk@gmail.com:meteorEire@smtp.gmail.com:587';
});

Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
});