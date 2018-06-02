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

    var departure_date = req.query.init;
    var origin = req.query.origin;
    var list = []

	result.then(function(response){
		var query = response.result;
        var count = query.meta.count;
        console.log(count);

        for (var i = 0; i < count; i++) {
            var airport = query.data[i];

            console.log("correct! iata: " +airport.iataCode+ " ");
            console.log("origin: " +origin + "departuredate " + departure_date);
            console.log("\n");

			// Flight Low-fare Search
			  var reqn = amadeus.shopping.flightOffers.get({
                  origin : origin.toString(),
                  destination : airport.iataCode.toString(),
                  departureDate : departure_date.toString()
			});

            reqn.then(function(response){
                var queryn = response.result;
                console.log("\n");
                console.log(queryn);


                for (var j = 0; j < queryn.data.length; i++){

                    var offer_items = data[j].offerItems;
                    var off_last = offer_items[offer_items.length -1];
                    var services = off_last.services
                    var service_last = services[services.lenght -1];
                    var segments = service_last.segments;
                    var segment_last = segments[segments.lenght -1];

                    var fsegment = segment_last.arrival.iataCode;
                    list.push({destination: fsegment.arrival.iataCode, price: {total: off_last.price.total}});
                }

            }).catch(function(error){
                process_error(error);
            });
        }

        //res.json(response.result)
        res.json(list);

		console.log("\n");
		//console.log(query);
	}).catch(function(error){
        process_error(error);
	});


    //res.json(api_result);

};
