var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./models/airport'), //created model loading here
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

var mongoDB = 'mongodb://127.0.0.1';
mongoose.connect(mongoDB);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes'); //importing route
routes(app); //register the route

//Set up mongoose connection

//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//app.get('/', function (req, res) {
//      res.send('Hello World!');
//});

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});

