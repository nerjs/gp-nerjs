const React = require('react');
const ListItem = require('./list-item')

const ListItems = ({list, active}) => {
	return (
		<ul className="list-items" style={{
			height: active ? list.length * 20 : 0 
		}} >
			{list.map((l,i) => <li key={i} className="list-item"><ListItem item={l} index={i} /></li>)}
		</ul>
	)
}

module.exports = ListItems