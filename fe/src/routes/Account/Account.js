import React, { Component } from 'react';
import { Link } from 'react-router';
import './Account.scss';

class Account extends Component {
	static defaultProps = { params: {} };

	render() {
		return (
			<section className="Account">
				<div className="container">
					<h1>Your personal dashboard<br />
					<small>{this.props.params.username}</small></h1>
					<div className="Account__biography">
						<b>bio:</b> {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}<br />
						🌍 <a href="lalka">https://website.com/</a>
					</div>
					<div className="col-md-4">
						<div className="list">			
							<h2>Your repositories</h2>
							<div className="row">
								<div className="col-md-5">
									<Link to={`/user/${this.props.params.username}/repository`}>repository name</Link>
								</div>
								<div className="col-md-7">
									<p>12 <small>(latest 12.05.2017)</small></p>
								</div>
							</div>
						</div>
						<div className="list">
							<h2>Your contributes</h2>
							<div className="row">
								<div className="col-md-5">
									<Link to={`/user/${this.props.params.username}/repository`}>repository name</Link>
								</div>
								<div className="col-md-7">
									<p>12 <small>(latest 12.05.2017)</small></p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-8 list">
						<h2>Your commits</h2>
						<div className="row">
							<div className="col-md-2">
								<Link to={`/user/${this.props.params.username}/repository`}>repository name</Link>
							</div>
							<div className="col-md-1">
								<p><Link to={`/user/${this.props.params.username}/repository`}><small>#asd81sd</small></Link></p>
							</div>
							<div className="col-md-6">
								<p><small>Description text</small></p>
							</div>
							<div className="col-md-3">
								<p>12:00:00</p>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2">
								<Link to={`/user/${this.props.params.username}/repository`}>repository name</Link>
							</div>
							<div className="col-md-1">
								<p><Link to={`/user/${this.props.params.username}/repository`}><small>#asd81sd</small></Link></p>
							</div>
							<div className="col-md-6">
								<p><small>Description text</small></p>
							</div>
							<div className="col-md-3">
								<p>12:00:00</p>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2">
								<Link to={`/user/${this.props.params.username}/repository`}>repository name</Link>
							</div>
							<div className="col-md-1">
								<p><Link to={`/user/${this.props.params.username}/repository`}><small>#asd81sd</small></Link></p>
							</div>
							<div className="col-md-6">
								<p><small>Description text</small></p>
							</div>
							<div className="col-md-3">
								<p>12:00:00</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Account;
