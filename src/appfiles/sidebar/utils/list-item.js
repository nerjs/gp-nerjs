const React = require('react');

const ListItem = props => {
	
	return (
		<div className="ListItem" >
			{props.item.name}
		</div>
	)
}

module.exports = ListItem