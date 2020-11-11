const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/', (req, res) => {
  //req.session.uname != null
  if (req.cookies['uname'] != null) {
    res.render('home/home');
  } else {
    res.redirect('/login');
  }
});

router.get('/userlist', (req, res) => {
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

  var sql = 'select * from user ';
  connection.query(sql, function (error, results) {
    res.render('home/userlist', { userlist: results });
  });

  connection.end(function (err) {
    console.log('connection closed!');
  });
});

module.exports = router;
