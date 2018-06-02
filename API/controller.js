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
    var api_result = amadeus.shopping.flightDestinations.get({
        origin: 'MAD',
        maxPrice: 200
    })

    api_result.then(function(response){
        res.json(response.result)
    }).catch(function(error){
        console.log(error.response); //=> The response object with (un)parsed data
        console.log(error.response.request); //=> The details of the request made
        console.log(error.code); //=> A unique error code to identify the type of error
    });


    //res.json(api_result);

};

