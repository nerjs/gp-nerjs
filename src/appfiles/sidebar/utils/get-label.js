const React = require('react')
const getIco = require('./get-ico')
const Right = require('react-icons/lib/fa/caret-right')
const cl = require('classnames')

exports.LabelCtg = props => {
	const cls = cl('label-ctg',`label-ctg-name-${props.name}`,{
		['label-ctg-active'] : !!props.active,
		'with-ico' : !!props.ico
	})
	
	let ico = props.ico ? <div className="label-ico label-ctg-ico">{getIco(props.ico)}</div> : null;
	

	return (
		<div className={cls} title={props.label || props.name}>
			{ico}
			<div className="label-ctg-txt">
				{props.label || props.name}
			</div>
			<Right className="caret" size={25}/>
		</div>
	)
}

exports.LabelList = props => {
	const cls = cl('label-list',`label-list-name-${props.name}`,{
		'width-ico' : !!props.ico
	})

	let ico = props.ico ? <span className="label-ico label-list-ico">{getIco(props.ico)}</span> : null;


	return (
		<div className={cls}>
			{ico}
			<span className="label-list-txt">
				{props.name}
			</span>
		</div>
	)
}