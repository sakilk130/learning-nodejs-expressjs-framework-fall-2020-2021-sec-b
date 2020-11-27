const express = require('express');
const travel_guide_model = require.main.require('./models/travel_guide_model');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies['uname'] != null) {
    res.render('user/home');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
