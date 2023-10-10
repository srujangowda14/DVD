var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var laptopRouter = require('./main/dvd');

var app = express();
var port= 3030;

app.use(logger('dev'));
app.use(express.json());


app.use('/laptops', laptopRouter);

app.use(function(req, res, next) {
    next(createError(404));
});


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
app.listen(port, () => console.log(`DVD app listening on port ${port}!`))

module.exports = app;

