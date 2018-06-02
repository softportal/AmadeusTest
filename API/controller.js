'use strict';

var mongoose = require('mongoose'),
Task = mongoose.model('airport');
var Amadeus = require('amadeus');
var amadeus = new Amadeus();

exports.list_all_airports = function(req, res) {
    Task.find({}, function(err, task) {
        if (err)
            res.send(err);
            res.json(task);
    });
};

exports.test = function(req, res) {
    //
    //amadeus

};

