import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';

@inject('uiStore')
@observer
class Login extends Component {
	handleSubmit = e => {
		e.preventDefault();

		this.props.uiStore.logIn(e.target.name.value, e.target.password.value).then(() => {
			browserHistory.push('/');
		});
	}

	render() {
		return (
			<section className="Login">
				<div className="container">
					<div className="row">
					  <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
					    <div className="paragraph-lg">
					      <h1 className="gny-title">Login to your Bander account</h1>
					    </div>
					    <form onSubmit={this.handleSubmit} acceptCharset="UTF-8" role="form" data-toggle="validator" method="post" className="background" noValidate="true">
					      <div className="form-group form-group-lg">
					        <input id="name" name="name" type="text" required autoFocus className="form-control" placeholder="Username" />
					      </div>

					      <div className="form-group form-group-lg">
					        <input id="password" name="password" type="password" required className="form-control" placeholder="Password" />
					      </div>

					      <div className="text-right">
					        <button className="btn btn-lg btn-success" type="submit">
					          Login
					        </button>
					      </div>

					    </form>

					    <div>
					      <a className="btn btn-link" href="/register">
					        No Account yet?
					      </a>
					    </div>

					  </div>
					</div>
				</div>
			</section>
		);
	}
}

export default Login;

