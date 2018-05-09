const React = require('react');
const {connect} = require('react-redux')
const CloseButton = require('react-icons/lib/fa/close')
const parseSettings = require('./utils/parse-settings')
const isFunction = require('lodash/isFunction');


class RootModal extends React.Component {
	constructor(props) {
		super(props)


		this.state = {
			open : false,
			id : 0,
			name : '',
			options : {},
			myData : null,
			is : false,
			settings : {}
		}

		this.modals = props.modals
		this.modalsSettings = {}
		Object.keys(props.modals).forEach(key => {
			this.modalsSettings[key] = parseSettings(props.modals[key])
			this.state.settings[key] = parseSettings(props.modals[key])
		})

		props.dispatch({
			type : 'modal:__list',
			payload : Object.keys(props.modals)
		})

		this.settings = {};
		this.Component = null;

		this.close = this.close.bind(this)
		this.closeInn = this.closeInn.bind(this)
		this.getComp()
	}

	getComp() {
		this.Component = this.modals[this.props.modalData.name];
		this.settings = parseSettings(this.Component)
	}

	close(e,t) {
		const type = t ? 'reset': 'close';
		// console.log(e, e.target === this.refs.layer, e.target === this.refs.modal, e.target === this.refs.test)
		
		if (this.modalsSettings[this.state.name].closeFn && isFunction(this.modalsSettings[this.state.name].closeFn)) {
			this.modalsSettings[this.state.name].closeFn(type,myData => {
				this.setState({myData})
			}, () => {
				this.props.dispatch(`modal:${type}`)
			})
		} else {
			this.props.dispatch(`modal:${type}`)
		}
	}

	closeInn(e) {
		if (e.target == this.refs.inner) this.close(e);
	}


	componentWillReceiveProps(np) {
		let {open,id, name, options} = np.modalData

		if (np.modalData.open && !this.state.open) {
			this.state.open = true,
			this.state.is = true;
			this.state.id = id;
			this.state.name = name;
			this.state.myData = this.state.settings[name].myData;
			this.state.options = options;
			return;
		}

		if (!np.modalData.open && this.state.open) {
			this.state.open = false,
			this.state.is = true;
			this.state.id = id;
			this.state.name = name;
			this.state.options = {};
			this.state.myData = null;
			return;
		}

		if (!np.modalData.open) return;



		if (this.state.id != np.modalData.id) {
			if (np.modalData.row.length > 0 
					&& np.modalData.row[np.modalData.row.length - 1].id == this.state.id 
					&& this.state.settings[name].closeFn 
					&& isFunction(this.state.settings[name].closeFn)) {
				let t = Date.now();

				this.state.settings[name].closeFn(
					'replace',
					md => {
						if (t == Date.now()) {
							this.state.myData = md;
						} else {
							this.setState({
								myData : md
							})
						}
					},
					() => {
						if (t == Date.now()) {
							this.state.is = false;
						} else {
							this.setState({is:false})
						}
					}
				)
				this.state.is = true;
			} else {
				this.state.is = false
			}

		}
	}

	componentDidUpdate() {
		if (!this.state.is) {
			this.getComp();
			let {id, name, options} = this.props.modalData;
			this.setState({
				myData : this.settings.myData,
				is : true,
				id,
				name,
				options
			})
		}
	}



	getLayer() {
		const settings = this.modalsSettings[this.props.modalData.name]
		if (!settings.layer) return null;


		const props = {
			id : '_modal-layer',
			style : {
				position: 'fixed',
				top: 0,
				right : 0,
				left : 0,
				bottom : 0,
				backgroundColor : settings.layerColor || this.props.layerColor,
				opacity : (settings.layerOpacity || this.props.layerOpacity) / 100,
				zIndex : 2
			}
		};

		if (settings.layerClose) {
			props.onClick = this.close;
		}

		return <div {...props} />;
	}

	getCloseButton() {
		const settings = this.modalsSettings[this.props.modalData.name]
		if (!settings.closeButton) return null;

		let opacity = settings.layerOpacity || this.props.layerOpacity;
		if (opacity > 99) {
			opacity = 100;
		} else {
			opacity = Math.round(opacity + ((100 - opacity) / 1.5)) / 100
		}

		return (
			<div id="_modal-close" 
				className="modal-close" 
				onClick={this.close} 
				style={{
					position: 'fixed',
					top: '0.4em',
					right: '0.4em',
					width: '2.8em',
					height : '2.8em',
					cursor: 'pointer',
					zIndex: 4,
					borderRadius: 7,
					opacity,
					boxShadow: '0 0 6px rgba(0,0,0,.4)'
				}}>

				<CloseButton style={{
					width: '100%',
					height: '100%',
					fill : settings.layerColor || this.props.layerColor
				}} />
			</div>
		);
	}



	render() {

		if (!this.state.open) return null;

		const Component = this.modals[this.state.name];
		const innerProps = {
			id : '_modal-inner',
			ref: 'inner',
			style : {
				position: 'relative',
				width: '100%',
				border: '1px solid transparent',
				zIndex: 3
			}
		}

		if (this.modalsSettings[this.props.modalData.name] && this.modalsSettings[this.props.modalData.name].layerClose) {
			innerProps.onClick = this.closeInn;
		}


		return (
			<React.Fragment>
				{this.getLayer()}
				{this.getCloseButton()}

				<div {...innerProps} >
						{ Component && this.state.is ? <Component {...this.state.options}
													_id={this.state.id} 
													_row={this.props.modalData.row}
													_myData={this.state.myData} 
													dispatch={this.props.dispatch} 
													modalClose={this.close}
													/> : null}
				</div>
			</React.Fragment>
		);
	}

}





module.exports = RootModal