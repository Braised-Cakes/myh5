var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
let session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const {
  AJ_STATUS,
  AJ_MESSAGE
} = require('./const/index')
var index = require('./routes/index');
var users = require('./routes/users');
const types = require('./api/types')
// let dbHandel = require('../server/db/handel.js')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'who am i ?',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  saveUninitialized: true,
  resave: true
}))
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/store', express.static('/Users/BraisedCakes/Desktop/2018/myh5-store/svg'));
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });



// app.use(function (err, req, res) {
// 	res.setHeader('Content-Type', 'text/plain')
// 	res.write('you posted:\n')
// 	res.end(JSON.stringify(req.body, null, 2))
//   })
// error handler
app.all('/*', (req, res, next) => {
  if (req.session.username || req.path == types.getUserInfo || req.path == types.userLogin || req.path == types.userRegister) {
    next()
  } else {
    res.send({
      status: AJ_STATUS.notlogin,
      data: {},
      message: AJ_MESSAGE.error
    })
    // res.redirect('/#/login')
  }
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // res.end(JSON.stringify(req.body, null, 2))
});


module.exports = app;
