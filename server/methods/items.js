Meteor.methods({
  'Items.insert': function (params) {
    Items.insert(params);
  },
  'createTruck': function(truckEmail,truckPassword,truckProfile){
      Accounts.createUser({
          email: truckName,
          password: truckPassword,
          profile: truckProfile
      }, function (error) {
          if(error){
              console.log(error.reason);
          }else{
              Router.go('truckInformation');
          }
      });
  }

});
