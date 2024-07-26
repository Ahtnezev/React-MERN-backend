const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
	
	title: {
		type: String,
		required: true,
	},
	notes: {
		type: String
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId, // va a ser una referencia 
		ref: 'Usuario',
		required: true,
	}
});

//~ Asi cambiamos el _id por id y ocultamos el __v en el monguito
// colocamos function porque necesitamos hacer referencia al this
EventoSchema.method('toJSON', function() {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Evento', EventoSchema);