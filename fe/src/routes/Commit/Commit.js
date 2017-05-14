import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import Dropzone from 'react-dropzone'; // eslint-disable-line
import './Commit.scss';

@inject('repositoriesStore')
@observer
export default class Commit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: null
		}
	}

	handleSubmit = e => {
		e.preventDefault();

		const formData = this.state.formData;
		formData.append('message', e.target.message.value);
		formData.append('update', true);

		this.props.repositoriesStore.uploadFile(formData, this.props.params.repository).then(data => {
			browserHistory.push(`user/${this.props.params.username}/${this.props.params.repository}`);
	}) };

	// eslint-disable-next-line
	handleDrop = (acceptedFiles, rejectedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('repository', this.props.params.repository);
    this.setState({ formData });
	}

	render() {
		return (
			<section className="Commit">
				<div className="container">
					<div className="row">
					  <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
					    <div className="paragraph-lg">
					      <h1 className="gny-title">Push your changes</h1>
					    </div>
					    <form acceptCharset="UTF-8" name="form" onSubmit={this.handleSubmit} role="form" data-toggle="validator" method="post" className="background" noValidate="true">
					      <div className="form-group form-group-lg">
					        <input name="message" type="text" required autoFocus className="form-control" placeholder="Describe your changes" />
					      </div>

					      <div className="drop">
						      <Dropzone onDrop={this.handleDrop}>
	  								{({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
	  							    if (isDragActive) {
	  							      return 'MAKE IT HARDER!';
	  							    }
	  							    if (isDragReject) {
	  							      return 'This file is not authorized';
	  							    }
	  							    return acceptedFiles.length || rejectedFiles.length
	  							      ? `Okay, sending your file`
	  							      : 'Drop me file';
	  							  }}
	  							</Dropzone>
	  							<br />
					      </div>

					      <div className="text-right">
					        <button className="btn btn-lg btn-success" type="submit">
					          Push it
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

