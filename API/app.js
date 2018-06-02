var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./models/airport'), //created model loading here
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

var mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


var routes = require('./routes'); //importing route
routes(app); //register the route


app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});

