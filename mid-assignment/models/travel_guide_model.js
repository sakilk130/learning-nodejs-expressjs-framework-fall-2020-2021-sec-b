const db = require('./db');

module.exports = {
  validate: function (user, callback) {
    var sql =
      "select * from users where username='" +
      user.username +
      "' and password='" +
      user.password +
      "'";
    console.log(sql);
    db.getResults(sql, function (results) {
      if (results.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },
  create: function (user, callback) {
    var sql =
      "INSERT INTO users (name, username, email,phone,type,password) VALUES ('" +
      user.name +
      "' , '" +
      user.username +
      "' , '" +
      user.email +
      "','" +
      user.phone +
      "','" +
      user.type +
      "','" +
      user.password +
      "')";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getByUsername: function (user, callback) {
    var sql = "SELECT * FROM users WHERE username='" + user + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  updateProfile: function (user, callback) {
    var sql =
      "UPDATE users SET name='" +
      user.name +
      "', username='" +
      user.username +
      "', email='" +
      user.email +
      "', phone='" +
      user.phone +
      "' where username='" +
      user.uname +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  changePassword: function (user, callback) {
    var sql =
      "UPDATE users SET password='" +
      user.new_pass +
      "' where username='" +
      user.uname +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  getAllUsers: function (user, callback) {
    var sql = "SELECT * FROM users WHERE type='" + user + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  getById: function (user, callback) {
    var sql = "SELECT * FROM users WHERE id='" + user + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  updateUser: (user, callback) => {
    var sql =
      "UPDATE users SET name='" +
      user.name +
      "', username='" +
      user.username +
      "', email='" +
      user.email +
      "', phone='" +
      user.phone +
      "', type='" +
      user.type +
      "' where id='" +
      user.id +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  deleteUser: (user, callback) => {
    sql = "DELETE FROM users WHERE id='" + user + "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  createPost: function (user, callback) {
    var sql =
      "INSERT INTO post (ffrom, tto, drescription,cost,create_date,username,status) VALUES ('" +
      user.from +
      "' , '" +
      user.to +
      "' , '" +
      user.drescription +
      "','" +
      user.cost +
      "','" +
      user.create_date +
      "','" +
      user.uname +
      "','" +
      user.status +
      "')";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  getPostUname: function (user, callback) {
    var sql = "SELECT * FROM post WHERE status='" + user + "'";

    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getPostById: function (user, callback) {
    var sql = "SELECT * FROM post WHERE id='" + user + "'";

    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  updatePost: (user, callback) => {
    var sql =
      "UPDATE post SET ffrom='" +
      user.ffrom +
      "', tto='" +
      user.tto +
      "', drescription='" +
      user.drescription +
      "', cost='" +
      user.cost +
      "', create_date='" +
      user.create_date +
      "', status='" +
      user.status +
      "' where id='" +
      user.id +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  deletePost: function (user, callback) {
    var sql = "DELETE FROM post WHERE id='" + user + "'";

    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  allPost: function (user, callback) {
    var sql = "SELECT * FROM post WHERE status='" + user + "'";

    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  wishlist: function (user, callback) {
    var sql =
      "INSERT INTO wishlist (post_id,user_id) VALUES ('" +
      user.post_id +
      "','" +
      user.user_id +
      "')";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getWishlist: function (user, callback) {
    var sql =
      "SELECT post.ffrom AS postffrom, post.tto AS posttto, post.drescription AS postdrescription, post.cost AS postcost, post.create_date AS postcreate_date, wishlist.id AS wishlistid FROM post JOIN wishlist ON post.id = wishlist.post_id WHERE wishlist.user_id= '" +
      user +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
      console.log(results);
    });
  },

  getWishlistById: function (user, callback) {
    var sql =
      "SELECT post.ffrom AS postffrom, post.tto AS posttto, post.drescription AS postdrescription, post.cost AS postcost, post.create_date AS postcreate_date, wishlist.id AS wishlistid FROM post JOIN wishlist ON post.id = wishlist.post_id WHERE wishlist.id= '" +
      user +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
      console.log(results);
    });
  },
  deleteWishlist: (user, callback) => {
    var sql = "DELETE FROM wishlist WHERE id='" + user + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  commentPost: (user, callback) => {
    var sql =
      "INSERT INTO comments (post_id,username,comment) VALUES ('" +
      user.id +
      "','" +
      user.username +
      "','" +
      user.comment +
      "')";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getCommentsById: function (user, callback) {
    var sql = "SELECT * FROM comments WHERE post_id='" + user + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
};
