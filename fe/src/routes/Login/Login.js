import React, { Component } from 'react';

export default class Login extends Component {
	render() {
		return (
			<section className="Login">
				<div className="container">
					<div className="row">
					  <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
					    <div className="paragraph-lg">
					      <h1 className="gny-title">Login to your Bander account</h1>
					    </div>
					    <form acceptCharset="UTF-8" role="form" data-toggle="validator" method="post" className="background" noValidate="true">
					      <div className="form-group form-group-lg">
					        <input id="email" name="email" type="email" required="" autoFocus="" className="form-control" placeholder="Email Address" />
					        <div className="field-message text-danger">Please enter a valid email address</div>
					      </div>

					      <div className="form-group form-group-lg">
					        <input id="password" name="password" type="password"  required="" className="form-control" placeholder="Password" />
					        <div className="field-message text-danger">Please enter your password</div>
					      </div>

					      <div className="text-right">
					        <div className="pull-left">
					          <a className="btn btn-link" href="">
					            Forgot Password?
					          </a>
					        </div>
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

