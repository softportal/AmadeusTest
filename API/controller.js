'use strict';

var mongoose = require('mongoose'),
Task = mongoose.model('airport');
var Amadeus = require('amadeus');
var amadeus = new Amadeus({clientId: process.env.AMADEUS_CLIENT_ID, clientSecret: process.env.AMADEUS_CLIENT_SECRET });

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
    var api_result = amadeus.shopping.flightDestination.get({
        origin: 'MAD',
        maxPrice: 200
    });

    res.json(api_result);

};

