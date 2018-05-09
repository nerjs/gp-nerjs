const getDisplay = () => {
	let w = document.documentElement.clientWidth;
	if (w < 545) return 'xs';
	if (w < 767) return 'sm';
	if (w < 993) return 'md';
	if (w < 1201) return 'lg';

	return 'xl';
}

exports = module.exports = store => {
	window.addEventListener('resize',() => {
		let o = store.getState().main.display;
		let n = getDisplay();
		if (o != n) {
			store.dispatch({
				type : 'display',
				payload : n
			})
		}
	})	

}

exports.getDisplay = getDisplay;