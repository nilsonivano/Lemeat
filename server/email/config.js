Meteor.startup(function() {
    var mailgunSMTPLogin = Meteor.settings.mailgunSMTPLogin;
    var password = Meteor.settings.mailgunPassword;
    //process.env.MAIL_URL = mailgunSMTPLogin + ":" + password + "@smtp.mailgun.org:587";
    process.env.MAIL_URL = "smtp://"+ "postmaster%40sandbox6532d0db6cbd4c2fb899c2c7aff47d34.mailgun.org" + ":" + "3fd9739aaa838ed1f4b643fa347452cc" + "@smtp.mailgun.org:587";
    Accounts.emailTemplates.resetPassword.from = function(){
        return "Lemeat no-reply@lemeat.com"
    };
    Accounts.emailTemplates.resetPassword.subject = function(){
        return "Reset de senha - Lemeat"
    };
    Accounts.emailTemplates.resetPassword.text = function(user, url){
        var token = url.substring(url.lastIndexOf('/')+1, url.length);
        var newUrl = Meteor.absoluteUrl('resetPassword/' + token);
        var str = 'Olá,\n';
        str+= 'para obter uma nova senha, utilize o link abaixo\n';
        str+= newUrl;
        return str;
    };
});

Meteor.methods({
  'sendResetPassword': function(email) {
    var userId = Accounts.findUserByEmail(email);
    if (userId){
      Accounts.sendResetPasswordEmail(userId);
      return true
    }else{
      return false
    }


  }
});