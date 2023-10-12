var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dvdRouter = require('./main/dvd');
var indexRouter = require('./main/index');
var cors =  require('cors');

var app = express();
var port= 3035;

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.use('/',indexRouter);
app.use('/dvds', dvdRouter);

app.use(function(req, res, next) {
    next(createError(404));
});


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.error(err.stack);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.json();
  });
  
app.listen(port, () => console.log(`DVD app listening on port ${port}!`))

module.exports = app;

