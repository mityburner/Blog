var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 引入session所需模块
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// 引入数据库配置文件
var settings = require('./settings');

// 引入connect-flash模块
var flash = require('connect-flash');


//引入路由文件
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var doLogin = require('./routes/doLogin');
var reg = require('./routes/reg');
var doReg = require('./routes/doReg');
var logout = require('./routes/logout');
var u = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 应用flash中间件
app.use(flash());

//设置将session存储在数据库中
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStore({
        db: settings.db
    })
}));

// 全局变量的设置必须在设置路由之前
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    var err = req.flash('error');
    res.locals.error = err.length? err : null;
    var succ = req.flash('success');
    res.locals.success = succ.length? succ : null;
    next();
});


/**
* 设置路由
*/
app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/doLogin',doLogin);
app.use('/reg',reg);
app.use('/doReg',doReg);
app.use('/logout',logout);
app.use('/u',u);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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