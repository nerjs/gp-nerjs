const React = require('react');
const propTypes = require('prop-types');


class RootMenuTab extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			openIndex : null,
		}
		this.count = 0;
		this.switch = this.switch.bind(this)
	}

	switch(index) {
		this.setState({
			openIndex : index
		})
	}

	componentDidMount() {
		this.forceUpdate()
	}

	getChildContext() {
		return {
			menuTabs : {
				switch : this.switch,
				openIndex : this.stateOpenIndex
				
			}
		}
	}

	render() {
		return this.props.children;
	}
}



RootMenuTab.childContextTypes = {
	menuTabs : propTypes.object
}

module.exports = RootMenuTab