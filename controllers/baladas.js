module.exports = function(app){

	var BaladaController = {
		index: function(req,res){
			res.render('baladas/index.jade');
		}
	}

	return BaladaController;
}