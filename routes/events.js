/**
	Event Routes
	/api/events + ?
*/

const { Router } = require("express");
const router = Router();
const {validarJWT} = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const {
	actualizarEvento,
	crearEvento,
	eliminarEvento,
	getEventos
} = require('../controllers/events');
const {validarCampos} = require('../middlewares/validar-campos');
const { isDate } = require("../helpers/isDate");

//~ Todas tienen que pasar por la validación del JWT.
router.use(validarJWT); // cualquier peticion que se encuentre abajo se va a validar que tenga token

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio.').not().isEmpty(),
		check('start', 'Fecha inicio es obligatoria.').custom( isDate ),
		check('end', 'Fecha final es obligatoria.').custom( isDate ),
		validarCampos,
	],
	crearEvento
);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Eliminar evento
router.delete('/:id', eliminarEvento);


module.exports = router;