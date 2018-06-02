var express = require ('express');

// web server library constructor
var app = express();
var mongoose = require('mongoose');

var mongoDB = '127.0.0.1';

//Set up mongoose connection
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var airport_schema = new Schema(
{
    airportId: {type: String, required: true},
    nameAirport: {type: String, required: true},
    codeIataAirport: {type: String },
    codeIso2Country: {type: String },
    codeIataCity: {type: String }
});


app.get('/', function (req, res) {
      res.send('Hello World!');
});

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});

