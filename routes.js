module.exports = function(app){

		// Our model controllers (rather than routes)
		var application_controller = require('./controllers/application_controller');
		var users_controller = require('./controllers/users_controller');
		var trips_controller = require('./controllers/trips_controller');
		var pricing_controller = require('./controllers/pricing_controller');

		app.use('/', application_controller);
		app.use('/users', users_controller);
		app.use('/trips', trips_controller);
		app.use('/pricing', pricing_controller);
    //other routes..
}