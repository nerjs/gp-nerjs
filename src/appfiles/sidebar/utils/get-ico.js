const React = require('react')

const icons = {
	
}

module.exports = name => {
	if (!name) return null;
	let Ico = icons[name] || require('react-icons/lib/fa/bookmark-o');
	return <Ico />
}

window.zzz = module.exports