const getData = require('v/get-data')
const isObject = require('lodash/isPlainObject')

exports.title = (store, next, title, action) => {
	if (!title || !title.toString) return;
	title = title.toString();
	document.title = title;
	next(action)
}

exports['menu:load'] = (store, next) => {
	getData('/data/menu.json?v=' + Math.random())
		.then(data => {
			
			if (!isObject(data) || !Array.isArray(data.ctg) || !Array.isArray(data.list)) throw new Error('resul for \"/data/menu.json\" must be {\"ctg\":Array(),\"list\":Array()}')
			next({
				type : 'menu:loaded',
				payload : data
			})
		})
		.catch(e => next({type:'modal:error',payload:{err:e}}))
}