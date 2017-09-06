'use strict';

const express = require('express');
const queryString = require('query-string');

const app = express();

const USERS = [
  {
    id: 1,
    firstName: 'Joe',
    lastName: 'Schmoe',
    userName: 'joeschmoe@business.com',
    position: 'Sr. Engineer',
    isAdmin: true,
    // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
    password: 'password'
  },
  {
    id: 2,
    firstName: 'Sally',
    lastName: 'Student',
    userName: 'sallystudent@business.com',
    position: 'Jr. Engineer',
    isAdmin: true,
    // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
    password: 'password'
  },
  // ...other users
];

const gateKeeper = function(req, res, next) {
  // console.log('running gateKeeper');
  
  // get header item and parse
  const uHdrString = req.get('x-username-and-password');
  console.log(uHdrString);
  const uLoginObj = queryString.parse(uHdrString);
  console.log(uLoginObj);
  
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

app.use("/api/users/me", gateKeeper);

app.get("/api/users/me", (req, res) => {
  if (req.user === undefined) {
    return res.status(403).json({ message: 'Must supply valid user credentials' });
  }
  const { firstName, lastName, id, userName, position } = req.user;
  return res.json({ firstName, lastName, id, userName, position });
});

// ... start the app
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));