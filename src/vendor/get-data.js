

module.exports = str => {
	return fetch(str)
				.then(res => {
					if (res.status == 200) return res.json();
					if (res.status == 404) throw new Error('data Not Found');
					return [];
				})
}