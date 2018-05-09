const isObject = require('lodash/isPlainObject');
const isFunction = require('lodash/isFunction');


const defSettings = {
	closeButton : true,
	layer : true,
	layerClose : true,
	layerColor : null,
	layerOpacity : null,
	myData : null
}


module.exports = function(comp) {
	let settings;

	if (!comp) {
		settings = {};
	} else if (isFunction(comp.modalSettings)) {
		settings = comp.modalSettings()
	} else if (isObject(comp.modalSettings)) {
		settings = comp.modalSettings
	}
	return {...defSettings, ...settings};
}