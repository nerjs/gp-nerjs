class CustomError extends Error {
	constructor(msg) {
		super(msg)
		this.name = 'CustomError';
		this.test = Math.random()
	}
}

exports.simple = disp => {
	let err = new Error('simple Error')
	disp({
		type : 'modal:error',
		payload : {err}
	})
}


exports.type = disp => {
	let err = new TypeError('simple TypeError')
	disp({
		type : 'modal:error',
		payload : {err}
	})
}

exports.custom = disp => {
	let err = new CustomError('my CustomError')
	disp({
		type : 'modal:error',
		payload : {err}
	})
}


exports.throw = disp => {
	try {
		[].map('qwerty')
	} catch(err) {
		disp({
			type: 'modal:error',
			payload: {err}
		})
	}
}