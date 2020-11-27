const express = require('express');
const travel_guide_model = require.main.require('./models/travel_guide_model');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});
router.post('/', (req, res) => {
  var user = {
    username: req.body.username,
    password: req.body.password,
  };
  const username = req.body.username;
  travel_guide_model.validate(user, function (status) {
    console.log(status);
    if (status) {
      travel_guide_model.getByUsername(username, function (status1) {
        const type = status1[0].type;
        console.log(type);
        if (type === 'General User') {
          res.cookie('uname', req.body.username);
          res.redirect('/user');
        } else if (type === 'Admin') {
          res.cookie('uname', req.body.username);
          res.redirect('/admin');
        } else if (type === 'Scout') {
          res.cookie('uname', req.body.username);
          res.redirect('/scout');
        } else {
          res.send(
            '<script>alert("Login Failed !!!"); window.location.href ="/login"; </script>'
          );
        }
      });
    } else {
      res.send('Login ERROR');
    }
  });
});
module.exports = router;
