const React = require('react');
const Form = require('../form');
require('./disc.css')

class Discussion extends React.Component {
	constructor(props) {
		super(props)

	}




	render() {
		return (
			<div className="Discussion">
				<p>test</p>
				<Form name="discussion" {...this.props} />
			</div>
		);
	}
}

module.exports = Discussion