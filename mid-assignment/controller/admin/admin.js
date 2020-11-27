const express = require('express');
const travel_guide_model = require.main.require('./models/travel_guide_model');
const router = express.Router();

// Admin Home
router.get('/', (req, res) => {
  if (req.cookies['uname'] != null) {
    res.render('admin/admin');
  } else {
    res.redirect('/login');
  }
});

// Admin Profile
router.get('/profile', (req, res) => {
  if (req.cookies['uname'] != null) {
    const username = req.cookies['uname'];

    travel_guide_model.getByUsername(username, function (results) {
      console.log(results);
      res.render('admin/profile', { user: results });
    });
  } else {
    res.redirect('/login');
  }
});

// Admin Profile
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
      res.redirect('/admin');
    } else {
      res.send('Not Update');
    }
  });
});

// Admin Change Password
router.get('/change', (req, res) => {
  if (req.cookies['uname'] != null) {
    res.render('admin/change');
  } else {
    res.redirect('/login');
  }
});
// Admin Change Password
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
            res.redirect('/admin');
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
// All Users
router.get('/users', (req, res) => {
  if (req.cookies['uname'] != null) {
    travel_guide_model.getAllUsers('General User', function (results) {
      res.render('admin/all_general_user', { user: results });
    });
  } else {
    res.redirect('/login');
  }
});
// Edit Users
router.get('/user/edit/:id', (req, res) => {
  const id = req.params.id;
  if (req.cookies['uname'] != null) {
    travel_guide_model.getById(id, function (results) {
      res.render('admin/edit_user', { user: results });
    });
  } else {
    res.redirect('/login');
  }
});

// Edit Users
router.post('/user/edit/:id', (req, res) => {
  const user = {
    id: req.params.id,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    type: req.body.type,
  };

  if (req.cookies['uname'] != null) {
    travel_guide_model.updateUser(user, function (results) {
      res.redirect('/admin/users');
    });
  } else {
    res.redirect('/login');
  }
});
// Delete Users
router.get('/user/delete/:id', (req, res) => {
  const id = req.params.id;
  if (req.cookies['uname'] != null) {
    travel_guide_model.getById(id, function (results) {
      res.render('admin/delete_user', { user: results });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/user/delete/:id', (req, res) => {
  const id = req.params.id;
  if (req.cookies['uname'] != null) {
    travel_guide_model.deleteUser(id, function (results) {
      res.redirect('/admin/users');
    });
  } else {
    res.redirect('/login');
  }
});
// All Scouts
router.get('/scouts', (req, res) => {
  if (req.cookies['uname'] != null) {
    travel_guide_model.getAllUsers('Scout', function (results) {
      res.render('admin/all_scouts', { user: results });
    });
  } else {
    res.redirect('/login');
  }
});
module.exports = router;
