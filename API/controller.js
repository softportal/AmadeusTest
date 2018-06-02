'use strict';

function process_error(error){
        console.log("RESPONSE :\n");
        console.log("============= \n");
        console.log(error.response); //=> The response object with (un)parsed data
        console.log("RESPONSE REQUEST:\n");
        console.log("============= \n");
        console.log(error.response.request); //=> The details of the request made
        console.log("============= \n");
        console.log(error.code); //=> A unique error code to identify the type of error
        console.log("\n\n");
}

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

exports.search = function(req, res) {
    //
    //amadeus
    //console.log(req);
    var api_result = amadeus.shopping.flightDestinations.get({
        origin: req.query.origin,
        maxPrice: req.query.price,
	departureDate: req.query.init,
	oneWay: false,
	duration: req.query.end
    })

    api_result.then(function(response){
        res.json(response.result)
    }).catch(function(error){

        process_error(error);
    });


    //res.json(api_result);

};

exports.search_by_location = function(req, res) {
    //
    // Aiport Nearest Relevant Airport
       var result=amadeus.referenceData.locations.airports.get({
	   longitude : req.query.longitude,
	   latitude  : req.query.latitude
	})

	result.then(function(response){
		var query = response.result;
        var count = query.meta.count;
        console.log(count);

        for (var i = 0; i < count; i++) {
            console.log("correcto "+i);
        }

		console.log(query);
	}).catch(function(error){
        process_error(error);
	});


    //res.json(api_result);

};
