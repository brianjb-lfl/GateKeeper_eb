'use strict';

const express = require('express');
const {gateKeeper} = require('./gateKeeper/gateKeeper');

const app = express();



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