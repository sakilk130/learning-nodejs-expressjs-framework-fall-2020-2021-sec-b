const express = require('express');
const travel_guide_model = require.main.require('./models/travel_guide_model');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies['uname'] != null) {
    const username = req.cookies['uname'];
    travel_guide_model.getByUsername(username, function (results) {
      travel_guide_model.allPost('accept', function (results2) {
        res.render('user/home', { user: results, post: results2 });
      });
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
      res.render('user/profile', { user: results });
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
      res.redirect('/user');
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
      res.render('user/change', { user: results });
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
            res.redirect('/user');
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

router.get('/wishlist/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    const id = req.params.id;
    travel_guide_model.getByUsername(req.cookies['uname'], function (results) {
      travel_guide_model.getPostById(id, function (results2) {
        res.render('user/wishlist', { user: results, post: results2 });
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/wishlist/:id', (req, res) => {
  const id = {
    id: req.params.id,
  };
  if (req.cookies['uname'] != null) {
    travel_guide_model.getByUsername(req.cookies['uname'], function (results) {
      const wishlist = {
        post_id: id.id,
        user_id: results[0].id,
      };
      travel_guide_model.wishlist(wishlist, function (results2) {
        res.redirect('/user/allwishlist');
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/allwishlist', (req, res) => {
  if (req.cookies['uname'] != null) {
    travel_guide_model.getByUsername(req.cookies['uname'], function (results) {
      const user = {
        id: results[0].id,
      };

      travel_guide_model.getWishlist(results[0].id, function (results2) {
        console.log(results2);

        res.render('user/all_wishlist', { user: results, post: results2 });
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/allwishlist/delete/:id', (req, res) => {
  const id = req.params.id;

  if (req.cookies['uname'] != null) {
    travel_guide_model.getByUsername(req.cookies['uname'], function (results) {
      travel_guide_model.getWishlistById(id, function (results2) {
        res.render('user/remove_wishlist', { user: results, post: results2 });
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/allwishlist/delete/:id', (req, res) => {
  const id = req.params.id;
  if (req.cookies['uname'] != null) {
    travel_guide_model.deleteWishlist(id, function (results) {
      res.redirect('/user/allwishlist');
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  if (req.cookies['uname'] != null) {
    travel_guide_model.getByUsername(req.cookies['uname'], function (results) {
      travel_guide_model.getPostById(id, function (results2) {
        travel_guide_model.getCommentsById(id, function (results3) {
          res.render('user/comments', {
            user: results,
            post: results2,
            comments: results3,
          });
          // res.send(results3);
        });
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/comments/:id', (req, res) => {
  const comment = {
    id: req.params.id,
    username: req.cookies['uname'],
    comment: req.body.comment,
  };
  if (req.cookies['uname'] != null) {
    travel_guide_model.commentPost(comment, function (results) {
      // res.send('OK');
      res.redirect(`/user/comments/${req.params.id}`);
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
