const React = require('react');
const Sidebar = require('../sidebar')
const Content = require('../content')

require('./page.css')

const Page = props => {
	
	return (
		<div id="page" >
			<Sidebar type="inner"/>
			<Content/>
		</div>
	)
}

module.exports = Page