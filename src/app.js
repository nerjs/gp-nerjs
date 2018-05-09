const React = require('react');
const { Link } = require('react-router-dom')
const { connect } = require('react-redux')
require('./css/root.css');
const { Container } = require('v/container-for-modal')
const modals = require('./appfiles/modals');
const Header = require('./appfiles/header');
const Page = require('./appfiles/page/');
const Footer = require('./appfiles/footer')

class App extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		return (
			<Container id="root" className="root" modals={modals}>
				<Header />
				<Page />
				<Footer />
			</Container>
		);
	}
}

module.exports = App