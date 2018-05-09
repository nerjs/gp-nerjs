const React = require('react');
const { connect } = require('react-redux');
const Core = require('./menu')
require('./sidebar.css')

class Sidebar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hide : false
		}
	}

	componentDidUpdate() {
		if (this.state.hide && this.refs.sc.offsetParent) {
			this.setState({ hide : false });
		} else if (!this.state.hide && !this.refs.sc.offsetParent) {
			this.setState({ hide : true });
		}
	}

	render() {
		console.log('render')
		return (
			<div id="sidebar-container" ref="sc">
				{this.state.hide ? null : <Core {...this.props} type="inner" />}
			</div>
		);
	}
}

module.exports = connect(
	({menu}) => {
		return {...menu}
	}
)(Sidebar);