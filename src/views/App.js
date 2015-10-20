import React from "react";
import Relay from "react-relay";

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
						<li><a href="/users/1">User 1</a></li>
						<li><a href="/users/2">User 2</a></li>
						<li><a href="/users/3">User 3</a></li>
						<li><a href="/users/4">User 4</a></li>
						<li><a href="/users/5">User 5</a></li>
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
