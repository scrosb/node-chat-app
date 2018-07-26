//Unix Epoch January 1, 1970 00:00:00 am
const moment = require('moment');

var createdAt = 1234;
var date = moment(createdAt);

// date.add(100, 'year').subtract(9, 'months');

//10:35 am

new Date().getTime()

var someTimestamp = moment().valueOf();

console.log(someTimestamp);
console.log(date.format('h:mm a '));