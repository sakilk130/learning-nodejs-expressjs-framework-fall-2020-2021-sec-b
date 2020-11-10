const express = require('express');
const router = express.Router();
var mysql = require('mysql');

router.get('/create', (req, res) => {
  res.render('user/create');
});

router.post('/create', (req, res) => {
  var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'sakil',
    password: 'rREPa3GP54',
    database: 'node1',
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
    var data = [[req.body.username, req.body.password, req.body.type]];

    var sql = 'INSERT INTO user (username, password, type) VALUES ?';
    con.query(sql, [data], function (err, result) {
      if (err) throw err;
      console.log('1 record inserted');
    });
  });
  res.redirect('/home/userlist');
});

router.get('/edit/:id', (req, res) => {
  var id = req.params.id;
  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'sakil',
    password: 'rREPa3GP54',
    database: 'node1',
  });

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

  var sql = "select * from user where id='" + req.params.id + "'";

  connection.query(sql, function (error, results) {
    res.render('user/edit', { userlist: results });
    // console.log(results);
  });

  connection.end(function (err) {
    console.log('connection closed!');
  });
});

router.post('/edit/:id', (req, res) => {
  var id = req.params.id;
  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'sakil',
    password: 'rREPa3GP54',
    database: 'node1',
  });

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
  var data = [[req.body.username, req.body.password, req.body.type, 1]];
  var sql =
    "UPDATE user SET username='" +
    req.body.username +
    "',password='" +
    req.body.password +
    "', type='" +
    req.body.type +
    "' where id='" +
    id +
    "'";

  connection.query(sql, [data], function (error, results) {
    if (error) throw error;
    console.log('1 record update');
  });

  connection.end(function (err) {
    console.log('connection closed!');
  });
  res.redirect('/home/userlist');
});

module.exports = router;
