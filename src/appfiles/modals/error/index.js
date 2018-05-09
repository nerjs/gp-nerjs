const React = require('react');
require('./error-modal.css')

class ErrorModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			is :false
		}
	}

	componentDidMount() {
		if (!this.props.err || !this.props.err.name) {
			this.props.dispatch(['modal:close',{
							type : 'modal:error',
							payload : {
								err : new Error('prop err in ErrorModal must be Error')
							}
						}])

			return;
		}
		setTimeout(()=>this.setState({is:true}),10)
	}

	render() {
		if (!this.props.err) return null;
		let {err} = this.props;
		let stack = err.stack.split('\n');
		return (
			<div className={`error-modal ${this.state.is ? 'err-active' : 'err-no-active'}`}>
				<div className="err-modal-info">
					<h3>{err.name}</h3>
					<h4>{err.message}</h4>
					<hr/>

					{Object.keys(err).length == 0 ? null : (<table cellSpacing={1}>
																<thead >
																	<tr>
																		<th className="name">name</th>
																		<th className="value">value</th>
																	</tr>
																</thead>
																<tbody>
																	{Object.keys(err).filter(key => key).map(key => (
																		<tr key={key}>
																			<td className="name">{key}</td>
																			<td className="value">{err[key]}</td>
																		</tr>
																	))}
																</tbody>
															</table>)}

				</div>
				<div className="err-modal-stack">
					<ul>
						{stack.map(v => (<li key={v}>{v}</li>))}
					</ul>
				</div>
			</div>
		);
	}
}

ErrorModal.modalSettings = {
	closeButton : true,
	layer : true,
	layerClose : false,
	// layerColor : '#dc3545',
	layerOpacity : 55
}

module.exports = ErrorModal