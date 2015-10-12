import React from "react";
import Relay from "react-relay";
import InlineCss from "react-inline-css";

class Main extends React.Component {
	render() {
		return (
			<InlineCss stylesheet={Main.css()} namespace = "Main">
				<div>
					<h3>User {this.props.user.id}</h3>
					<p>This user is just a test</p>
				</div>
			</InlineCss>
		);
	}

	static css() {
		return `
			& > div {
				background-color: #333;
			}

			& h3 {
				color: red;
			}

			& p {
				color: blue;
			}
		`;
	}
};

export default Relay.createContainer(Main, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				name
			}
		`
	}
});
