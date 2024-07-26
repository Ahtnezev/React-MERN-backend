//* lo cargagamos para tener la ayuda del intelligense de nuevo...
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const jwt = require('jsonwebtoken');

//* 👽
const crearUsuario = async (req, res = response) => {
	// console.log(req.body);
	const { email, password } = req.body;

	try {
		let usuario = await Usuario.findOne({email}); // -> correo:email || correo:correo = correo
		// console.log(usuario);
		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario ya existe.'
			});
		}

		usuario = new Usuario(req.body);

		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		await usuario.save();

		// Generar JWT
		const token = await generarJWT(usuario.id, usuario.name);

		// No es obligatorio colocar return en la ultima sentencia pero no hay problema
		res.status(201).json({
			ok: true,
			uid: usuario._id,
			name: usuario.name,
			token
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador.',
		});
	}
}


//* 🍺
const loginUsuario = async(req, res = response) => {
	const { email, password } = req.body;

	try {
		const usuario = await Usuario.findOne({email});
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario no existe con ese email.'
			});
		}

		// Confirmar passwords
		const validPassword =  bcrypt.compareSync(password, usuario.password);
		if(!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecto.'
			});
		}

		// Generar nuestro JWT (Json Web Token)
		const token = await generarJWT(usuario.id, usuario.name);

		res.status(200).json({
			ok: true,
			uid: usuario._id,
			name: usuario.name,
			token
		});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador.',
		});
	}
}


//* ✨
const revalidarToken = async(req, res = response) => {

	const {uid,name} = req;

	// Generar un nuevo JET y retornarlo en esta petición
	const token = await generarJWT(uid, name);


	res.json({
		ok: true,
		token
	});
}


module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken,
};



//~ express-validator
// if (name.length <= 5) {
// colocar return para que no se vuelva a ejecutar el codigo de abajo
// 	return res.status(400).json({
// 		ok: false,
// 		msg: 'El nombre debe de ser 5 letras.'
// 	});
// }