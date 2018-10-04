var express = require('express');
var fs = require('fs');

var router = express.Router({
  mergeParams: true
});

var User = require('./db').User

router.all('/', function (req, res, next){
  console.log(req.method, 'for', req.params.username);
  next();  
})

router.get('/', function (req, res) {
  var username = req.params.username
  User.findOne({username: username}, function(err, user){
    res.render('user', {
      user: user,
      address: user.location
    })
  })
})

router.use(function( err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Some error occurred.');    
})

router.put('/', function (req, res) {
  var username = req.params.username
  User.findOne({username: username}, function(err, user){
    if (err) console.error(err);

    user.name.full = req.body.name;   //virtual setter, cfr. db.js
    user.location = req.body.location;
    user.save(function() {
      res.end();
    })
  })
})

router.delete('/', function (req, res) {
  var username = req.params.username
  User.findOneAndDelete({username: username}, function(err){
    if(err){
      console.error(err)
    } else {
      res.sendStatus(200);
    }
  })
})

module.exports = router