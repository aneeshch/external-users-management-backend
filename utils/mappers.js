const helpers = require('./helpers');

exports.usersList = (data) => data.map((eachUser) => ({
  firstName: eachUser.firstName,
  lastName: eachUser.lastName,
  ssn: helpers.decrypt(eachUser.ssn),
  address: eachUser.address,
  telephoneNo: eachUser.telephoneNo,
}));
