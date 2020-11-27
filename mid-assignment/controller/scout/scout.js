const express = require('express');
const travel_guide_model = require.main.require('./models/travel_guide_model');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies['uname'] != null) {
    const username = req.cookies['uname'];
    travel_guide_model.getByUsername(username, function (results) {
      res.render('scout/scout', { user: results });
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/profile', (req, res) => {
  if (req.cookies['uname'] != null) {
    const username = req.cookies['uname'];
    travel_guide_model.getByUsername(username, function (results) {
      // console.log(results);
      res.render('scout/profile', { user: results });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/profile', (req, res) => {
  const user = {
    uname: req.cookies['uname'],
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  };
  console.log(user);
  travel_guide_model.updateProfile(user, function (status) {
    if (status) {
      res.redirect('/scout');
    } else {
      res.send('Not Update');
    }
  });
});

router.get('/change', (req, res) => {
  if (req.cookies['uname'] != null) {
    const username = req.cookies['uname'];
    travel_guide_model.getByUsername(username, function (results) {
      // console.log(results);
      res.render('scout/change', { user: results });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/change', (req, res) => {
  const change = {
    uname: req.cookies['uname'],
    old_pass: req.body.old_pass,
    new_pass: req.body.new_pass,
    c_new_pass: req.body.c_new_pass,
  };
  travel_guide_model.getByUsername(change.uname, function (results) {
    if (change.old_pass === results[0].password) {
      if (change.new_pass === change.c_new_pass) {
        travel_guide_model.changePassword(change, function (status) {
          if (status) {
            res.redirect('/scout');
          } else {
            res.send('Not Update');
          }
        });
      } else {
        res.send("Password doesn't Match");
      }
    } else {
      res.send("Old Pass doesn't match");
    }
  });
});
module.exports = router;
