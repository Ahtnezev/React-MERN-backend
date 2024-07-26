const { response } = require('express');
const { validationResult } = require('express-validator');

// next -> hace que pase al siguiente hasta llegar al controlador -> routes/auth.js

const validarCampos = (req, res = response, next) => {

	// Manejo de errores
	const errors = validationResult(req);
	// console.log(errors); // errores en el server
	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: errors.mapped()
		});
	}

	next();
}


module.exports = {
	validarCampos
};

