const express = require('express');
const travel_guide_model = require.main.require('./models/travel_guide_model');
const router = express.Router();

router.get('/', (req, res) => {
  travel_guide_model.allPost('accept', function (results) {
    res.render('index', { post: results });
    // res.send(results);
  });
});
module.exports = router;
