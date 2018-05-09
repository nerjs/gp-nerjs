const React = require('react');
const propTypes = require('prop-types');

class TabMenuTab extends React.Component {
	constructor(props,context) {
		super(props,context)
		console.log('-----------------------------------------')
		this.__test = 'qwerty'
	}

	componentDidMount() {
		this.context.menu.is()
		setTimeout(()=>console.log('cdm',this.context.menu),100)
	}

	render() {
		console.log('count',this.context.menu.count)
		return (
			<div className="TabMenuTab">
				{this.props.children}
			</div>
		);
	}
}

TabMenuTab.contextTypes = {
	menu : propTypes.object
}

module.exports = TabMenuTab