import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('repositoriesStore')
@observer
export default class CreateRepository extends Component {
	handleSubmit = e => {
		e.preventDefault();

		this.props.repositoriesStore.createRepository(this.props.params.username, e.target.title.value, e.target.description.value);
	}

	render() {
		return (
			<section className="CreateRepository">
				<div className="container">
					<div className="row">
					  <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
					    <div className="paragraph-lg">
					      <h1 className="gny-title">Create repository</h1>
					    </div>
					    <form acceptCharset="UTF-8" onSubmit={this.handleSubmit} role="form" data-toggle="validator" method="post" className="background" noValidate="true">
					      <div className="form-group form-group-lg">
					        <input name="title" type="text" required autoFocus className="form-control" placeholder="Title" />
					      </div>

					      <div className="form-group form-group-lg">
					      	<textarea name="description" className="form-control"placeholder="Description" />
					      </div>

					      <div className="text-right">
					        <button className="btn btn-lg btn-success" type="submit">
					          Turn things on
					        </button>
					      </div>
					    </form>
					  </div>
					</div>
				</div>
			</section>
		);
	}
}

