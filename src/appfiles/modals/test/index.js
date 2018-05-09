const React = require('react');
const Form = require('../form')
require('./test.css')
const cl = require('classnames')



class TestModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			main : false
		}

	}


	componentDidMount() {
		setTimeout(()=>this.setState({main:true}),1000)
	}




	render() {
		console.log('test',this.props._myData)
		const cls = cl('test',{
			start : !this.state.main && this.props._myData == 1,
			main : this.state.main && this.props._myData == 1,
			['close-test'] : this.props._myData == 2,
			reset : this.props._myData == 3
		})
		return (
			<div className={cls} >
				<Form name="test" {...this.props} />
			</div>
		);
	}
}


TestModal.modalSettings = () => ({
	myData : 1,
	closeFn : (type, ss, close) => {
		if (type == 'close') {
			ss(2)
		} else {
			ss(3)
		}

		setTimeout(close,1000)
	}
})

TestModal.closeFn = (a,b,c) => {
	console.log('tm:ms',a,b,c)
	setTimeout(()=>b(111),2000)
	setTimeout(()=>c(),5000)
}

module.exports = TestModal