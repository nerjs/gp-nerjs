const React = require('react');
const render = require('react-dom').render;
const { Provider } = require('react-redux')
const { HashRouter } = require('react-router-dom')
const eId = document.getElementById('app');
require('normalize.css')
require('bootstrap/dist/css/bootstrap.css')

const App = require('./app');
const store = require('api/store')


render(
	<Provider store={store}>
		<HashRouter basename="/" >
			<App/>
		</HashRouter>
	</Provider>
,eId)