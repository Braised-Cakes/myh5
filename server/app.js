var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
let session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let url = require('url')

const {
  AJ_STATUS,
  AJ_MESSAGE
} = require('./const/index')
// var index = require('./routes/index');
// var users = require('./routes/users');
const types = require('./api/types')
let dbHandel = require('./db/handel.js')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('art', require('express-art-template'));
var runtime = require('art-template/lib/runtime');
runtime.parseStyle = function (date, format) {
  let str = ''
  for (let attr in date) {
    str += attr + ':' + date[attr] + ';'
  }
  return str
};
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({
  limit: '50mb'
}));
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

app.use('/store', express.static('/Users/BraisedCakes/Desktop/2018/myh5-store/svg'));

app.get('/show', function (req, res) {
  let myh5 = dbHandel.getModel('myh5')
  let id = url.parse(req.url, true).query['id']
  myh5.findOne({
    id: id
  }, (err, docs) => {
    res.render(path.resolve(process.cwd(), 'web/public/index.art'), {
      info: docs.data
    });
  });

});

app.all('/aj/*', function (req, res, next) {
  console.log(req.path)
  if (req.session.username || req.path == '/app.js' || req.path == types.getScene || req.path == types.getUserInfo || req.path == types.userLogin || req.path == types.userRegister) {
    next()
  } else {
    res.send({
      status: AJ_STATUS.notlogin,
      data: {},
      message: AJ_MESSAGE.error
    })
  }
});

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
