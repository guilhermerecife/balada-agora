module.exports = function(app){

	var validacao = require('../validacoes/usuarios.js');
	var Usuario = app.models.usuarios;

	var UsuarioController = {
		index: function(req,res){
			Usuario.find(function(err,data){
				if(err){
					req.flah('erro', 'Erro ao buscar usuários: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/index.jade', {lista: data});
				}
			});
		},

		create: function(req,res){
			res.render('usuarios/create.jade');
		},

		salvar: function(req,res){
			if(validacao(req,res)){
				var model 		= new Usuario();
				model.nome 		= req.body.nome;
				model.email 	= req.body.email;
				model.site		= req.body.site;
				model.password  = model.generateHash(req.body.password);
				model.save(function(err){
					if(err){
						req.flash('erro', 'Erro ao cadastrar usuario: '+err);
						res.render('usuarios/create', {user: req.body});
					}else{
						req.flash('info', 'Usuario cadastrado com sucesso!');
						res.redirect('/usuarios');
					}
				});
			}else{
				res.render('usuarios/create', {user: req.body});
			}
		},

		show: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Erro visualizar usuario: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/show', {dados: data});
				}
			});
		},

		delete: function(req,res){
			Usuario.remove({_id: req.params.id}, function(err){
				if(err){
					req.flash('erro', 'Erro ao excluir usuario: '+err);
					res.redirect('/usuarios');
				}else{
					req.flash('info', 'Usuario excluido com sucesso!');
					res.redirect('/usuarios');
				}
			});
		},

		edit: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao editar usuario: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/edit', {dados: data});
				}
			});
		},

		update: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				var model 	= data;
				model.nome 	= req.body.nome;
				model.site 	= req.body.site;

				model.save(function(err){
					if(err){
						req.flash('erro', 'Erro ao editar usuario: '+err);
						res.render('usuarios/edit', {dados: model});
					}else{
						req.flash('info', 'Usuario atualizado com sucesso!');
						res.redirect('/usuarios');
					}
				});
			});
		}
	}

	return UsuarioController;
}