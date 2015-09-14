import React from "react";
import Relay from "react-relay";

class App extends React.Component {
	static propTypes = {
		children: React.PropTypes.node.isRequired
	};

	render() {
		return (
			<header>
				<h1>Relay Isomorphic Starter Kit</h1>
			</header>
			
			{children}

			<footer>
				<p>
					<a href="https://github.com/DanielHuisman/relay-isomorphic-starter-kit">
						https://github.com/DanielHuisman/relay-isomorphic-starter-kit
					</a>
				</p>
			</footer>
		);
	}
};

export default Relay.createContainer(App, {});
