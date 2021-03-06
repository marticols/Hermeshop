require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require('uglify-js');
var fs = require('fs');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'jade');
var appClientFiles = [
  'app_client/adminApp.js',
  'app_client/common/services/adminData.service.js',
  'app_client/admin/admin.controller.js',
  'app_client/admin/createModal/createModal.controller.js',
  'app_client/admin/deleteModal/deleteModal.controller.js',
  'app_client/common/filters/formatPrice.filter.js',
  'app_client/admin/updateModal/updateModal.controller.js',
  'app_client/common/services/authentication.service.js',
  'app_client/auth/register.controller.js',
  'app_client/auth/login.controller.js',
  'app_client/common/directives/navadmin/navadmin.directive.js',
  'app_client/admin/navadmin.controller.js'
];
var uglified = uglifyJs.minify(appClientFiles, { compress: false});
fs.writeFile('public/angular/hermes.min.js', uglified.code, function (err){
  if(err){
    console.log(err);
  } else {
    console.log('Script generated and saved: hermes.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

app.use('/', routes);
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
