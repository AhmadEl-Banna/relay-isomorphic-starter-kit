import React from "react";
import Relay from "react-relay";
import InlineCss from "react-inline-css";
import Helmet from "react-helmet";

class Main extends React.Component {
	render() {
		return (
			<InlineCss stylesheet={Main.css()} namespace = "Main">
				{(() => {
					if(this.props.user) {
						return (
							<div>
								<Helmet title={this.props.user.name} />
								<h3>User {this.props.user._id}: {this.props.user.name}</h3>
								<p>This user is just a test</p>
							</div>
						);
					} else {
						return (
							<div>
								<Helmet title="User Not Found" />
								<h3>User not found</h3>
							</div>
						);
					}
				})()}
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
				id
				_id
				name
			}
		`
	}
});
