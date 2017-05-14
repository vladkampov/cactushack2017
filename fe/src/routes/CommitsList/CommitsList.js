import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { getPreetyDate } from '../../utils';
import './CommitsList.scss';

@inject('repositoriesStore')
@observer
class CommitsList extends Component {
	static defaultProps = { params: {} };

	componentDidMount() {
		this.props.repositoriesStore.getRepository(this.props.params.username, this.props.params.repository).then(data => {
			console.log(data);
		});
	}

	render() {
		return (
			<section className="CommitsList">
				<div className="container">
					<h2><Link to={`/user/${this.props.params.username}/${this.props.params.repository}`}>{this.props.params.repository}</Link> <small><i className="fa fa-arrow-circle-o-right" aria-hidden="true" /></small> Changes history</h2>
					{this.props.repositoriesStore.currentRepository.commits.map(commit => {
						console.log(commit);

						return (
							<div className="row" key={commit.time}>
								<p className="col-md-3"><i className="fa fa-clock-o" aria-hidden="true" /> {getPreetyDate(new Date(commit.time))}</p>
								<p className="col-md-5"><i className="fa fa-commenting-o" aria-hidden="true" /> {commit.message}</p>
								<p className="col-md-2"><i className="fa fa-user" aria-hidden="true" /> <Link to={`/user/${commit.commiter}`}>{commit.commiter}</Link></p>
								<div className="col-md-2 text-right"><Link to="" className="btn btn-success">Difference</Link></div>
							</div>
						);
					})}
				</div>
			</section>
		);
	}
}

export default CommitsList;
