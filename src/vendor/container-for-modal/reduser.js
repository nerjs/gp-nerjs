const getKey = require('./utils/get-key')


const def = {
	open : false,
	id : null,
	name : 'other',
	options : {},
	modalNames : [],
	row : []
}

const mClose = state => {
	if (!state.open) return state;
	if (state.row.length == 0) {
		return {
			...def,
			modalNames:state.modalNames
		}
	}

	let {id,options,name} = state.row[state.row.length - 1];
	let row = state.row.filter(m => (m.id != id))
	return {
		open : true,
		id,
		name,
		options,
		modalNames : state.modalNames,
		row
	};
}

const mUpdate = (state,data) => {
	if (!data) return state;
	let { id, ...no} = data;
	if (!id) return state;
	if (state.id == id) {
		let { options } = state;
		return {
			...state,
			options : {...options,...no}
		}
	}
	return {
		...state,
		row : state.row.map(m => {
			if (m.id != id) return m;
			return {
				...m,
				options : {
					...m.options,
					...no
				}
			}
		})
	}
}

const mOpen = (state, type, options, nId=null) => {
	if (state.modalNames.indexOf(type) < 0) return state;
	let name = type.split(':')[1];
	let id = nId || getKey();
	let row = [];
	if (state.open) {
		row = [...state.row]
		row.push({
			id : state.id,
			name : state.name,
			options : state.options || {}
		})
	}
	let {modalNames} = state;

	return {
		open : true,
		id,
		name,
		options : options || {},
		modalNames,
		row
	}
}

const mUp = (state,id) => {
	if (state.id == id || state.row.length == 0) return state;
	let mod = null;
	let row = state.row.filter(m => {
		if (m.id != id) return true;
		mod = m;
		return false;
	})

	if (!mod) return state;
	return mOpen({...state, row}, `modal:${mod.name}`, mod.options, mod.id);
}

module.exports = (state=def, action) => {
	switch (action.type) {
		case 'modal:__list':
			if (!Array.isArray(action.payload)) return state;
			return {
				...state, 
				modalNames:action.payload.map(v => `modal:${v}`)
			};
		break;
		case 'modal:close':
			return mClose(state);
		break;
		case 'modal:update':
			return mUpdate(state,action.payload);
		break;
		case 'modal:up':
			return mUp(state,action.payload);
		break;
	}

	return mOpen(state,action.type,action.payload)
}