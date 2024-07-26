const {response} = require('express');
// mandar por headers y es recomendable usar x-mi-header
const jwt = require('jsonwebtoken');

const validarJWT = (req, res =  response, next) => {
	//* Headers
	// x-token 
	const token = req.header('x-token'); // leer
	// console.log(token);
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la petición.'
		});
	}

	try {
		const { uid, name } = jwt.verify(token, process.env.SECRETE_JWT_SEED);
		// console.log(payload);

		req.uid = uid;
		req.name = name;


	} catch (error) {
		console.log(error);
		return res.status(401).json({
			ok:false,
			msg: 'Token no válido.'
		})
	}

	next();
}


module.exports = {
	validarJWT
}