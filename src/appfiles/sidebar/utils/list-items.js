const React = require('react');
const ListItem = require('./list-item')

const ListItems = ({list, active}) => {
	return (
		<ul className="list-items" >
			{list.map((l,i) => (
				<li key={i} onClick={()=>alert(123)}
					className="list-item" 
					style={{
						transitionDelay: `${i*0.1}s`
					}}
					>
					<ListItem item={l} index={i} />
				</li>
			))}
		</ul>
	)
}

module.exports = ListItems