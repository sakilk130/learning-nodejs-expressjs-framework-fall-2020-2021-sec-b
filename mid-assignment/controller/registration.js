const express = require('express');
const travel_guide_model = require.main.require('./models/travel_guide_model');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', (req, res) => {
  const create = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    type: req.body.type,
    password: req.body.password,
  };
  // console.log(create);
  travel_guide_model.create(create, function (status) {
    if (status) {
      res.send(
        '<script>alert("Create Successful"); window.location.href ="/login"; </script>'
      );
    } else {
      res.send(
        '<script>alert("Failed !!!"); window.location.href ="/registration"; </script>'
      );
    }
  });
});

module.exports = router;
