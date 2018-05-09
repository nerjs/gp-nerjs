const def = {
	isLoaded : false,
	types : {},
	ctg : [],
	list : []
}

module.exports = (state=def,action) => {
	switch(action.type) {
		case 'menu:loaded':
			if (!Array.isArray(action.payload.ctg || !Array.isArray(action.payload.list))) return state;
			let ns = {...def,isLoaded:true,ctg:action.payload.ctg}
			ns.list = action.payload.list.filter(val => (typeof val == 'object' && val.cat && Array.isArray(val.cat)))
			ns.list.forEach(val => {
					val.cat.forEach(c => {
						if (!ns.types[c]) ns.types[c] = 0;
						ns.types[c]++;
					})
				})
			return ns;
		break;
	}

	return state;
}