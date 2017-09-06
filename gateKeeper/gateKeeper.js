'use strict';

const USERS = require('../adminUsers.json');

const queryString = require('query-string');

const gateKeeper = function(req, res, next) {
  // console.log('running gateKeeper');
  
  // get header item and parse
  const uHdrString = req.get('x-username-and-password');
  const uLoginObj = queryString.parse(uHdrString);
  
  // look for userName
  let foundUser = USERS.find( u => u.userName === uLoginObj.user);

  if(foundUser){
    // check password
    if(foundUser.password === uLoginObj.pass){
      req.user = foundUser;
    }
  }
  
  next();
};

module.exports = {gateKeeper};