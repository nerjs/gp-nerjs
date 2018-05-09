const React = require('react');
const Sidebar = require('c/sidebar')

class SidebarModal extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="SidebarModal">
				<Sidebar {...this.props} />
			</div>
		);
	}
}

module.exports = SidebarModal