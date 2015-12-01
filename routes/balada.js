module.exports = function(app){

	var balada 		= app.controllers.baladas;
	var autenticar 	= require('../middleware/autenticar.js');

	app.route('/baladas').get(autenticar, balada.index);
}