const createReduxStore = require('create-redux-store');
const { modalsReduser } = require('v/container-for-modal')
const disp = require('./disp')



const redusers = {
	main : require('./redusers/main'),
	menu : require('./redusers/menu'),
	modals : modalsReduser
}

const mdw = [
	require('./mdw/main')
]


const store = createReduxStore(redusers,mdw)

disp(store);

module.exports = store;
