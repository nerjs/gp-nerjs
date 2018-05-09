const React = require('react');
const Modal = require('./modal');
const propTypes = require('prop-types');
const { connect } = require('react-redux');

let i = false
class ContainerForModal extends React.Component {
	constructor(props) {
		super(props)

		this.root = {
			isFixed : false,
			top : 0,
			scroll : 0
		}
	}

	componentDidUpdate(np,ns,s) {
		if (this.root.scroll > 0) {
			window.scrollTo(0,(this.root.scroll == 1 ? this.root.top : 0));
			this.root.scroll = 0;
		}
	}


	componentWillReceiveProps(np) {
		if (this.props.modalData.open == np.modalData.open) return;

		if (np.modalData.open) {
			this.root = {
				isFixed : true,
				top : window.pageYOffset,
				w : document.documentElement.clientWidth,
				scroll: 2
			}

			if (this.root.pr < 0) this.root.pr = 0;
		} else {
			this.root = {
				isFixed : false,
				top : this.root.top,
				pr : 0,
				scroll : 1
			}
		}
	}

	getStyle() {
		return {
			position : this.root.isFixed ? 'fixed' : 'relative',
			top : this.root.isFixed ? `-${this.root.top}px` : 0,
			zIndex: 1,
			left : 0,
			width: this.root.isFixed ? this.root.w : '100%'
			// paddingRight : this.root.pr
		}
	}


	render() {
		const {modals, layerOpacity, layerColor, style, modalData, dispatch, ...propsRoot } = this.props;
		const propsModal = {
			modals, 
			layerOpacity, 
			layerColor,
			modalData,
			dispatch
		};
		return (
			<div id="__root" style={{
				position: 'relative',
				width: '100%',
				zIndex : 1
			}}>
				<div {...propsRoot} style={this.getStyle()}>
					{this.props.children}
				</div>
				<Modal {... propsModal} />
			</div>
		);
	}
}

ContainerForModal.defaultProps = {
	layerOpacity : 30,
	layerColor : '#000'
}

ContainerForModal.propTypes = {
	modals : propTypes.object.isRequired,
	layerOpacity : propTypes.number,
	layerColor : propTypes.string
}


module.exports = connect(
		state => ({modalData:state.modals})
	)(ContainerForModal)