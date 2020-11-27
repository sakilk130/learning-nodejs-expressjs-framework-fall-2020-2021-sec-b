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

  // getAll: function (callback) {
  //   var sql = 'select * from user';
  //   db.getResults(sql, function (results) {
  //     callback(results);
  //   });
  // },
  // insert: function (user, callback) {
  //   var sql =
  //     "INSERT INTO user (username, password, type) VALUES ('" +
  //     user.username +
  //     "' , '" +
  //     user.password +
  //     "' , '" +
  //     user.type +
  //     "')";
  //   db.execute(sql, function (status) {
  //     callback(status);
  //   });
  // },
  // update: function (user, callback) {
  //   sql =
  //     "UPDATE user SET username='" +
  //     user.username +
  //     "',password='" +
  //     user.password +
  //     "', type='" +
  //     user.type +
  //     "' where id='" +
  //     user.id +
  //     "'";
  //   db.execute(sql, function (status) {
  //     callback(status);
  //   });
  // },
  // delete: function (user, callback) {
  //   sql = "DELETE FROM user WHERE id='" + user.id + "'";
  //   db.execute(sql, function (status) {
  //     callback(status);
  //   });
  // },
};
