const { getDisplay } = require('../disp')

let display = getDisplay()

const def = {
	title : document.title,
	display,
	sidebarOpen : true/*(display == 'xl' || display == 'lg')*/
}


module.exports = (state=def, action) => {

	switch (action.type) {
		case 'title':
			return {...state, title:action.payload}
		break;
		case 'display':
			return {...state, display:action.payload}
		break;
		case 'sidebar:open':
			return {...state, sidebarOpen: true}
		break;
		case 'sidebar:close':
			return {...state, sidebarOpen: false}
		break;
	}

	return state
}