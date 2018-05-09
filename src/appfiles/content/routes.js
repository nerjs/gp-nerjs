const React = require('react');
const {withRouter} = require('react-router-dom')

class Routes extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props)
		return (
			<div className="Routes">
				Routes {Math.random()}
			</div>
		);
	}
}

module.exports = withRouter(Routes)