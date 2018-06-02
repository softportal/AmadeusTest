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


airport_schema.virtual('url').get(function () {
    return '/test/airport/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);
