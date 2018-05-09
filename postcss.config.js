module.exports = ({options}) => {


	let plugins = {
		'postcss-import' : {},
		'postcss-apply' : {},
		'postcss-cssnext' : {
			browsers : [options.cssnextBrowsers],
			features : {
				customMedia : {
					extensions : {
						'--media-sm' : '(min-width: 576px)',
						'--media-md' : '(min-width: 768px)',
						'--media-lg' : '(min-width: 992px)',
						'--media-xl' : '(min-width: 1200px)',
						'--media-max-xs' : '(max-width: 575px)',
						'--media-max-sm' : '(max-width: 767px)',
						'--media-max-md' : '(max-width: 991px)',
						'--media-max-lg' : '(max-width: 1199px)'
					}
				}
			}
		},
		'css-mqpacker' : {
			sort : (first, last) => {
				if (first.search('min-width') < 0 && first.search('max-width') < 0) return 1; 
				if (last.search('min-width') < 0 && last.search('max-width') < 0) return -1; 
				if (first.search('min-width') >=0 && last.search('min-width') < 0) return 1;
				if (last.search('min-width') >=0 && first.search('min-width') < 0) return -1;

				let reg = /\:\s*([0-9]*)/;
				let f = first.match(reg);
				let l = last.match(reg);
				if (f.length < 2 || l.length < 2) return 0;
				f = Number(f[1]);
				l = Number(l[1]);



				if (isNaN(f) || isNaN(l)) return 0;
				if (first == last) return 0;
				return first.search('max-width') >= 0 ? (l - f) : (f - l);
			}
		},
		'postcss-discard-duplicates' : {}
	}

	if (process.env.NODE_ENV == 'prodaction') {
		plugins.cssnano = {
			preset : 'default',
			autoprefixer : false
		}
	}

	return {plugins}
}