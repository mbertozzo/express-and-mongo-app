var express = require('express')
var app = express()

var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate')
//var helpers = require('./helpers')

var bodyParser = require('body-parser')

var User = require('./db').User

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/profilepics', express.static('images'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/favicon.ico', function (req, res) {
  res.end()
})

app.get('/', function (req, res) {
  User.find({}, function(err, users){
    res.render('index', {users: users})
  })
})

app.get('*.json', function(req, res){
  res.download('users/' + req.path, 'file.json')  //(file, name)  
})

app.get('/data/:username', function (req, res){
  var username = req.params.username;
  var readable = fs.createReadStream('./users/' + username + '.json');
  readable.pipe(res)
})

app.get('/error/:username', function (req, res){
  res.status(404).send('No user named ' + req.params.username)
})

var userRouter = require('./username')
app.use('/:username', userRouter)

var server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})
