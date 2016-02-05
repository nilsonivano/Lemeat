Template.registerHelper('truncate', function(string, length) {
  var cleanString = s(string).stripTags();
  return s(cleanString).truncate(length);
});

//Format Date to 00:00
Template.registerHelper('dateTime', function(timestamp){
  if(timestamp){
    moment().locale('pt-br');
    return moment(timestamp).format('LT')
  } else{
    return timestamp
  }
});

//Format Date to 01/01/16
Template.registerHelper('dateDay', function(timestamp){
  if(timestamp){
    moment().locale('pt-br');
    return moment(timestamp).format('L')
  } else{
    return timestamp
  }
});