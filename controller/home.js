const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //req.session.uname != null
  if (req.cookies['uname'] != null) {
    var students = [
      ['Sakil Khan', '17-345130-1', 'CSE', 134],
      ['ABC', '17-345130-1', 'CSE', 134],
      ['XYZ', '47-345130-1', 'SE', 100],
      ['XXX', '77-345130-1', 'CSSE', 13],
      ['BBB', '87-345130-1', 'CS', 13],
    ];

    res.render('home/index', { studentList: students });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
