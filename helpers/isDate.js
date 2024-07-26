

const moment = require('moment');

// param -> rest
const isDate = ( value ) => { 
	
	if (!value) return false;

	const fecha = moment(value);
	if (fecha.isValid()) {
		return true;
	}


}

module.exports = {
	isDate
}

