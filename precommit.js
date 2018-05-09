const fs = require('fs')
const path = require('path')
const log = obj => console.dir(obj,{colors:true})
const prevData = require('./other/versions.json')
const {dependencies} = require('./package.json')
const htmlPath = path.join(__dirname,'nerjs.github.io','index.html')
const dependenciesPath = path.join(__dirname,'nerjs.github.io','dependencies.md')
let isChange = 0;

const onChange = (p='') => {
	return new Promise((resolve, reject) => {
		fs.stat(path.join(__dirname,'nerjs.github.io',p), (err, stat) => {
			if (err) return reject(err)
			let time = stat.mtime.getTime();
			resolve(time)
		})
	})
}

const onc = (t, f) => {
	return onChange(`/${t}/${f}.${t}`)
		.then(time => {
			if (prevData[t][`${f}_date`] != time) {
				prevData[t][`${f}_date`] = time;
				prevData[t][f]++
				isChange++;
			}
			return true
		}).catch(err => {
			log(err);
			prevData[t][`${f}_date`] = 0;
			return true;
		})

}

const wf = (p,d) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(p,d, err => {
			if (err) return reject(err);
			resolve(true);
		})
	})
}
const rf = (p) => {
	return new Promise((resolve, reject) => {
		fs.readFile(p, (err,data) => {
			if (err) return reject(err);
			resolve(data.toString());
		})
	})
}

const updateHtml = (is) => {
	if (!is) return Promise.resolve(true);
	return rf(htmlPath)
				.then(str => {
					str = str.replace(/(css\/common.css\?v=)([0-9]+)/g,`$1${prevData.css.common}`)
					str = str.replace(/(css\/core.css\?v=)([0-9]+)/g,`$1${prevData.css.core}`)
					str = str.replace(/(js\/common.js\?v=)([0-9]+)/g,`$1${prevData.js.common}`)
					str = str.replace(/(js\/core.js\?v=)([0-9]+)/g,`$1${prevData.js.core}`)
					return str;
				}).then( str => {
					return wf(htmlPath,str)
				})
}

const isPackage = () => {
	return new Promise((resolve, reject) => {
		fs.stat(path.join(__dirname,'package.json'),(err,stat) => {
			if (err) return reject(err);
			let time = stat.mtime.getTime();
			if (time != prevData.package) {
				prevData.package = time;
				resolve(true)
			} else {
				resolve(false)
			}
		})
	})
}

const dep = () => {
	let str = '# dependencies \n\n'
	str += '___module name___ | ****version*** \n';
	str += ':---|---:\n'
	Object.keys(dependencies).forEach(key => {
		if (key == 'node-static') return;
		str += `${key} | ${dependencies[key]} \n`
	})
	return wf(dependenciesPath, str);
}

const getGlob = () => {
	let p = path.join(__dirname,'nerjs.github.io','js','glob.js');

	return new Promise((resolve, reject) => {
		
		fs.stat(p, (err,stat) => {
			if (err || !stat.isFile()) return resolve(null);
			rf(p).then(resolve).catch(err=> {
				log(err);
				resolve(null)
			})
		})
	})
}

const dropGlob = str => {
	if (!str) return Promise.resolve(null);
	let p = path.join(__dirname,'nerjs.github.io','js','glob.js');
	return new Promise((resolve, reject) => {
		fs.unlink(p, err => {
			if (err) return reject(err);
			resolve(str)
		})
	})
}

const setGlob = str => {
	if (!str) return Promise.resolve(null);
	let p = path.join(__dirname,'other','glob.js')
	return wf(p, str)
}




onc('css','common')
	.then(()=>onc('css','core'))
	.then(()=>onc('js','common'))
	.then(()=>onc('js','core'))
	.then(()=>isPackage())
	.then(is => {
		if (is) return dep();
		return false;
	})
	.then(()=>{
		if (isChange == 0) return false;
		try {
			let json = JSON.stringify(prevData)
			return wf(path.join(__dirname,'other','versions.json'),json)
		} catch(e) {
			throw e
		}
	})
	.then(updateHtml)
	.then(getGlob)
	.then(dropGlob)
	.then(setGlob)
	.then(log)
	.catch(e => {
		console.log('*********** ERROR ***********')
		log(e)
	})


