const React = require('react');
const { connect } = require('react-redux')
const HomeIco = require('react-icons/lib/fa/home');
const MenuIco = require('react-icons/lib/ti/th-menu');
const { Link } = require('react-router-dom')
const InfoBlock = require('./info-block')
require('./header.css')

class Header extends React.Component {
	constructor(props) {
		super(props)

		this.openSidebar = this.openSidebar.bind(this)
	}

	openSidebar() {
		this.props.dispatch('modal:test')
	}

	render() {
		return (
			<div id="header">
				<div className="icons-block">
					<Link className="icons-link home-link" to="/"><HomeIco/></Link>
					<div className="icons-link menu-link" onClick={this.openSidebar}>
						<MenuIco />
					</div>
				</div>
				<h1 className="title">{this.props.title}</h1>
				<InfoBlock />
			</div>
		);
	}
}

module.exports = connect(
		state => ({
			title : state.main.title,
			display : state.main.display
		})
	)(Header)