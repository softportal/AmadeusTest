'use strict';
module.exports = function(app) {
    var controller = require('./controller');

    // todoList Routes
    app.route('/airports').get(controller.list_all_airports);
};
