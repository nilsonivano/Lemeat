Meteor.startup(function() {
    var SMTPLogin = Meteor.settings.smtpLogin;
    var SMTPPassword = Meteor.settings.smtpPassword;
    process.env.MAIL_URL = "smtp://"+ SMTPLogin + ":" + SMTPPassword + "@smtp.mailgun.org:2525";
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
        str+= 'para obter uma nova senha, utilize o link abaixo \n';
        str+= newUrl;
        return str;
    };
});

Meteor.methods({
  'sendResetPassword': function(email) {
      var userId = Accounts.findUserByEmail(email);
      this.unblock();
      if (userId){
        Accounts.sendResetPasswordEmail(userId);
        return true
      }else{
        return false
      }
  },
  'sendEmail': function (to, from, subject, html) {
      check([to, from, subject, html], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();
      Email.send({
          to: to,
          from: from,
          subject: subject,
          html: html
      });
  }
});