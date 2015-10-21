import React from "react";
import Relay from "react-relay";
import {Link, IndexLink} from "react-router";

class App extends React.Component {
	static propTypes = {
		children: React.PropTypes.node
	};

	render() {
		return (
			<section>
				<header>
					<h1>Relay Isomorphic Starter Kit</h1>
				</header>

				<div>
					{this.props.children}
				</div>

				<footer>
					<ul>
						<li><IndexLink to="/">Home</IndexLink></li>
						<li><Link to="/user/1">User 1</Link></li>
						<li><Link to="/user/2">User 2</Link></li>
						<li><Link to="/user/3">User 3</Link></li>
						<li><Link to="/user/4">User 4</Link></li>
						<li><Link to="/user/5">User 5</Link></li>
					</ul>
					<p>
						<a href="https://github.com/DanielHuisman/relay-isomorphic-starter-kit">
							https://github.com/DanielHuisman/relay-isomorphic-starter-kit
						</a>
					</p>
				</footer>
			</section>
		);
	}
};

export default Relay.createContainer(App, {
	fragments: {}
});
