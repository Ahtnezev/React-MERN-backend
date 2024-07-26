// const express = require('express');
// const router = express.Router;
const { Router } = require('express');
const router = Router();
const {check} = require('express-validator');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//~ para acceder aqui tenemos que colocar el path que viene desde el index y concatenar el de aqui /api/auth + /


/**
 * Rutas de usuarios // Auth
 * host + /api/auth
*/
router.post(
	'/new',
	[ // middlewares > 1 | callback = 1
		check('name', 'Nombre es requerido.').not().isEmpty(),
		check('email', 'Email es requerido.').isEmail(),
		check('password', 'Password debe ser de 6 caracteres.').isLength({min: 6}),
		validarCampos
	],
	crearUsuario
);
router.post(
	'/',
	[
		check('email', 'Email is required.').isEmail(),
		check('password', 'Password at least 8 characters.').isLength({min:6}),
		validarCampos
	],
	loginUsuario
);

router.get(
	'/renew',
	validarJWT,
	revalidarToken
);


//* exports en node
module.exports =  router;