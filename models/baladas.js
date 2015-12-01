var mongoose = require('mongoose');

module.exports = function(){

	var baladaSchema = mongoose.Schema({
		nome	: {type: String, trim: true},
		valor	: {type: String, trim: true},
		data_cad: {type: Date}
	});

	return mongoose.model('Baladas', baladaSchema);
}