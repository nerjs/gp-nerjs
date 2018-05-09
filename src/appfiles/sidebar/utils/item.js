const React = require('react');
const cl = require('classnames');
const { LabelCtg } = require('./get-label');
const ListItems = require('./list-items')

class MenuItem extends React.Component {
	constructor(props) {
		super(props)
	}

	onClick() {
		
	}

	render() {
		if (this.props.type == 'hr') return <hr className="sidebar-item-hr" />;
		if (!this.props.list || !this.props.list.length) return null;

		const {label, name, ico, active } = this.props;
		const cls = cl('menu-item',{
			active : this.props.active
		})
		let td = this.props.active || this.props.activeIndex < 0 ? 0 : Math.abs(this.props.index - this.props.activeIndex) * 0.1;

		if (!this.props.active) {

		}

		return (
			<section className={cls}>
				<div className="menu-label" style={{
					transitionDelay : `${td}s`
				}} 
					onClick={()=>this.props.onClick(this.props.name, this.props.index)} >
					<LabelCtg {...{label, name, ico, active}} />
				</div>
				<ListItems active={active} list={this.props.list} />
			</section>
		);
	}
}

module.exports = MenuItem