const React = require('react');

class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			a : this.props.a,
			b : this.props.b,
			modal: this.props.name,
			id : this.props._id
		}

		this.openM = this.openM.bind(this)
		this.updateM = this.updateM.bind(this)
		this.upM = this.upM.bind(this)
	}

	change(name) {
		this.setState({
			[name] : this.refs[name].value
		})
	}

	openM() {
		let {a,b,modal} = this.state
		this.props.dispatch({
			type : `modal:${modal}`,
			payload : {a,b}
		})
	}

	updateM() {
		let {a,b,id} = this.state;
		this.props.dispatch({
			type : 'modal:update',
			payload : {				
				id : Number(id),
				a,b
			}
		})
	}

	upM() {
		this.props.dispatch({
			type : 'modal:up',
			payload : Number(this.state.id)
		})
	}

	render() {

		let ids = this.props._row.map(m => m.id);
		if (ids.indexOf(this.props._id) < 0) {
			ids.push(this.props._id);
		}

		return (
			<div className="Form">
				<table className="table table-bordered table-striped table-dark">
					<tbody>
						<tr>
							<td>name</td>
							<td>{this.props.name}</td>
						</tr>
						<tr>
							<td>_id</td>
							<td>{this.props._id}</td>
						</tr>
						<tr>
							<td>_count</td>
							<td>{this.props._row.length}</td>
						</tr>
						<tr>
							<td>a</td>
							<td>{this.props.a}</td>
						</tr>
						<tr>
							<td>b</td>
							<td>{this.props.b}</td>
						</tr>
					</tbody>
				</table>

				<div className="container-fluid">
					<div className="row">



						<div className="col">
							<div className="input-group input-group-sm">
								<div className="input-group-prepend">
									<span className="input-group-text">a</span>
								</div>
								<input onChange={()=>this.change('a')} ref="a" defaultValue={this.state.a} type="text" className="form-controll"/>
							</div>
						</div>
						<div className="col">
							<div className="input-group input-group-sm">
								<div className="input-group-prepend">
									<span className="input-group-text">b</span>
								</div>
								<input onChange={()=>this.change('b')} ref="b" defaultValue={this.state.b} type="text" className="form-controll"/>
							</div>
						</div>



						<div className="col">
							<div className="input-group input-group-sm">
								<div className="input-group-prepend">
							    	<label className="input-group-text" htmlFor="modal">modal:</label>
							 	</div>
							  <select defaultValue={this.props.name} ref="modal" onChange={()=>this.change('modal')} className="custom-select" id="modal">
							    <option value="test">test</option>
							    <option value="discussion">discussion</option>
							  </select>
							  <button onClick={this.openM} className="btn btn-outline-primary">push</button>
							</div>
						</div>


						<div className="col offset-1">
							<div className="input-group input-group-sm">
							  <button onClick={this.updateM} className="btn btn-outline-warning">update</button>
							  <select defaultValue={this.props._id} ref="id" onChange={()=>this.change('id')} className="custom-select" id="modal">
							    {ids.map(id => <option key={id} value={id}>{id}</option>)}
							  </select>
							  <button onClick={this.upM} className="btn btn-outline-danger">push</button>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

module.exports = Form