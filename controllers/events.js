const { response } = require("express");
const Evento = require("../models/Evento");

/**
	Obtener Evento Method
*/
const getEventos = async(req, res = response) => {

	// .populate('user', 'name password'); //~ es tipo relacion, se trae la info
	const allEvents = await Evento.find()
									.populate('user', 'name');

	res.status(200).json({
		ok: true,
		eventos: allEvents
	});
}

/**
	Crear Evento Method
*/
const crearEvento = async (req, res = response) => {
	const evento = new Evento(req.body);

	try {
		evento.user = req.uid;
		const eventoSaved = await evento.save();
		res.status(200).json({
			ok:true,
			evento: eventoSaved
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador...',
		})
	}

	// Verificar que tenga el evento
	console.log(req.body);
}

/**
	Actualizar Evento Method
*/
const actualizarEvento = async(req, res = response) => {
	const eventoId = req.params.id;
	const uid = req.uid;

	try {
		const evento = await Evento.findById(eventoId);
		
		if(!evento)
			return res.status(404).json({ ok: false, msg: 'Evento id not found' });

		// verificar que el usuario este relacionado con la nota
		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene privilegio de editar este evento.'
			});
		}

		const nuevoEvento = {...req.body, user: uid};
		const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {
			new: true // para que retorne el nuevo documento y no ver la comparacion
		});

		res.status(200).json({ ok: true, evento: eventoActualizado });

	} catch (error) {
		console.log(error);
		return res.status(500).json({ ok: false, msg: 'Hable con el administrador #23....' });
	}
}

/**
	Eliminar Evento Method
*/
const eliminarEvento = async(req, res = response) => {
	const eventoId =  req.params.id;
	const uid = req.uid;

	try {
		const evento = await Evento.findById(eventoId);

		if(!evento) {
			return res.status(404).json({ ok: false, msg: 'Evento id not found' });
		}

		// Verificar que el usuario este relacionado con la nota
		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene privilegio de editar este evento.'
			});
		}

		const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
		// console.log(eventoEliminado);

		if (!eventoEliminado) {
			return res.status(404).json({
				ok: false,
				msg: 'notfound'
			});
		}
		
		res.status(200).json({ok: true});

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador #44....'
		});
	}
}

module.exports = {
	actualizarEvento,
	crearEvento,
	eliminarEvento,
	getEventos,
}