const React = require('react');
const Loader = require('c/loader')
const Item = require('./utils/item')


class MenuSidebar extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			active : null,
			index : -1
		}

		this.onClick = this.onClick.bind(this);
		this.winCloseItem = this.winCloseItem.bind(this);
	}

	winCloseItem() {
		console.log('wci')
		this.onClick(null);
	}

	onClick(name, index=-1) {
		let sn = name && this.props.types[name] ? name : null;
		if (sn == this.state.active) sn = null;

		if (sn && !this.state.active) {
			window.addEventListener('click',this.winCloseItem)
		} else if (!sn && this.state.active) {
			window.removeEventListener('click',this.winCloseItem)
		}

		if (!name) index = this.state.activeIndex;


		this.setState({active:sn,index})
	}

	coreOnClick(e) {
		e.stopPropagation()
	}

	componentDidMount() {
		if (!this.props.isLoaded) {
			this.props.dispatch('menu:load')
		}
	}

	render() {
		if (!this.props.isLoaded) return <div id="sidebar" className="core-sidebar"><Loader size={100} label="menu" /></div>
		return (
			<div id="sidebar" className={`core-sidebar ${this.state.active ? 'has-open' : ''}`}
				onClick={this.coreOnClick} >
				{this.props.ctg.map((ctg, i) => (
					<Item  {...ctg} 
						key={ctg.name || i}
						list={ctg.name && this.props.types[ctg.name] ? this.props.list.filter(val => (val.cat.indexOf(ctg.name) >= 0)) : null } 
						onClick={this.onClick} 
						index={i} 
						active={!!(this.state.active && this.state.active == ctg.name)} 
						activeIndex={this.state.index} />
				))}
			</div>
		);
	}
}

module.exports = MenuSidebar