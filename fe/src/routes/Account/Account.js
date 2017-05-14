import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import './Account.scss';

@inject('repositoriesStore')
@observer
class Account extends Component {
	static defaultProps = { params: {} };

	componentDidMount() {
		this.props.repositoriesStore.getRepositories();
	}

	render() {
		return (
			<section className="Account">
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<h1>{this.props.params.username}</h1>
							<div className="Account__biography">
								<i className="fa fa-globe" aria-hidden="true"/> <a href="lalka">https://website.com/</a><br />
								<b><i className="fa fa-user-circle-o" aria-hidden="true"/></b> {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, "}<br />
							</div>
						</div>
						<div className="col-md-9">
							<h2>Your repositories <span className="badge">{`${this.props.repositoriesStore.repositories.length}`}</span>
								<Link to={`/user/${this.props.params.username}/create`} className="btn btn-success pull-right">New repo</Link>
							</h2>
							<div className="row">
								{this.props.repositoriesStore.repositories.length ? this.props.repositoriesStore.repositories.map(data => {
									return (
										<div className="col-md-4">
											<div className="card">
												<h4><Link to={`/user/${this.props.params.username}/${data.title}`}>{data.title}</Link></h4>
												<p><i className="fa fa-info" aria-hidden="true" /> {data.description}</p>
												{data.lastUpdate ? (<p><i className="fa fa-clock-o" aria-hidden="true" /><small>{data.lastUpdate}</small></p>) : ''}
											</div>
										</div>
									)
								}) : (
									<p className="col-md-12">{'You don\'t have repo\'s so far. You should create one.'}</p>
								)}
							</div>
						</div>
					</div>
					<h2>Commit history</h2>
					<div className="row">
						{this.props.repositoriesStore.commitHistory.length ? this.props.repositoriesStore.commitHistory.map(data => {
							return (
								<div className="col-md-12">
									<div className="">
										<h4><Link to={`/user/${this.props.params.username}/${data.title}`}>{data.title}</Link></h4>
										<p><i className="fa fa-info" aria-hidden="true" /> {data.description}</p>
										{data.lastUpdate ? (<p><i className="fa fa-clock-o" aria-hidden="true" /><small>{data.lastUpdate}</small></p>) : ''}
									</div>
								</div>
							)
						}) : (
								<p className="col-md-12">{'You don\'t have commit\'s so far. Should you create one?'}</p>
						)}
					</div>
				</div>
			</section>
		);
	}
}

export default Account;
