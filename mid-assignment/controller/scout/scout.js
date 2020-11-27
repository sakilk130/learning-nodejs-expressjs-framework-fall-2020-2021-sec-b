const express = require('express');
const travel_guide_model = require.main.require('./models/travel_guide_model');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies['uname'] != null) {
    res.send(req.cookies['uname']);
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
