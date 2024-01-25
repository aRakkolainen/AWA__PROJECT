var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/api/user/login', function(req, res, next) {
  console.log("Trying to login..");
  //res.render('index', { title: 'Express' });
  console.log(req.body);
  res.send({message: "Login succeeded!"})
});

module.exports = router;
