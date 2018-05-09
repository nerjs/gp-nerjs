const React = require('react');
const { connect } = require('react-redux')
const {Route, Switch, Link,withRouter} = require('react-router-dom')
const Routes = require('./routes')
const errors = require('./errors')

let c = 0;

class Content extends React.Component {
	constructor(props) {
		super(props)
		this.btn = this.btn.bind(this)
		this.err = this.err.bind(this)
	}

	btn(str,ob) {
		return () => this.props.disp({
			type : `modal:${str}`,
			payload : ob
		})
	}

	err(type) {
		return () => errors[type](this.props.disp)
	}

	render() {
		return (
			<div className="Content" 
					onScroll={e=>console.log('scroll',e)} >
					<button onClick={()=>{c++;this.props.disp({type:'title',payload:c})}}>click</button>
					<hr/>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil animi tenetur ex, amet corrupti ab blanditiis reiciendis quibusdam voluptas laudantium magnam numquam eveniet dicta repudiandae quaerat cupiditate doloremque fugit sit praesentium velit pariatur ad eos recusandae mollitia. Impedit fugit non aperiam veritatis! Sint non fuga quas iure, dolor voluptatem odit et! Porro autem molestiae accusantium voluptatum, nemo reiciendis corrupti quisquam unde odio! Dolores, possimus quas, obcaecati nam porro vel in cumque corrupti exercitationem nihil modi iusto ab, accusamus consequatur asperiores ducimus hic laborum error quam. Et, laborum reprehenderit quasi vel cum iusto odit qui, vero neque accusamus atque ea nemo.
				<hr/>
				<Link to="/p/test"> /p/test </Link><br/>
				<Link to="/p/test/bla"> /p/test/bla </Link><br/>
				<Link to="/p/test/q/w/e/r/t/y?comment=1"> /p/test/q/w/e/r/t/y </Link><br/>
				<hr/>
					<Switch>
						<Route component={Routes} path="/p/:name/:targets*" />
						<Route path="/p/:name" component={Routes}/>
					</Switch>
				<hr/>

				<div className="container">
					<div className="row">
						<div className="col-2 offset-2">
							<button className="btn btn-primary btn-block" onClick={this.err('simple')}>Error</button>
						</div>
						<div className="col-2">
							<button className="btn btn-secondary btn-block" onClick={this.err('type')}>TypeError</button>
						</div>
						<div className="col-2">
							<button className="btn btn-danger btn-block" onClick={this.err('custom')}>CustomError</button>
						</div>
						<div className="col-2">
							<button className="btn btn-warning btn-block" onClick={this.err('throw')}>throw</button>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-6 offset-3">
							<div className="alert alert-info">
								<ul>
									<li>qwerty 1</li>
									<li>qwerty 2</li>
									<li>qwerty 3</li>
									<li>qwerty 4</li>
									<li>qwerty 5</li>
									<li>qwerty 6</li>
									<li>qwerty 7</li>
									<li>qwerty 8</li>
									<li>qwerty 9</li>
									<li>qwerty 10</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-4">
							<div className="alert alert-success">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quos, vitae iste qui hic voluptatum voluptas natus obcaecati voluptates mollitia ipsam inventore sunt, excepturi error, similique laudantium itaque quam velit.
							</div>
						</div>
						<div className="col-8"></div>
						<div className="col-4 offset-4">
							<div className="alert alert-secondary">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores magnam tempora, explicabo accusantium vero, dolore, earum sunt ipsam temporibus non quidem laudantium aliquid quae vitae natus autem perferendis aliquam nemo doloribus corporis quo nisi labore unde debitis. Quos, officiis!
							</div>
						</div>
						<div className="col-4"></div>
						<div className="col-4 offset-8">
							<div className="alert alert-warning">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat ullam natus sunt ea quasi quis beatae enim veritatis nisi laboriosam voluptate perferendis expedita, error obcaecati reprehenderit, animi ipsam eveniet minus accusantium. Sint ratione voluptates molestias, dolorem repellendus. Dolorem officiis optio magni praesentium dolorum. Eos consectetur iure consequuntur, magni. Illo, eius!
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = withRouter(connect(
	state => ({}),
	disp => ({
		disp
	})
)(Content))