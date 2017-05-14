import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone'; // eslint-disable-line
import './Repository.scss';

@inject('repositoriesStore')
@observer
class Repository extends Component {
	static defaultProps = { params: {} };

	componentDidMount() {
		this.props.repositoriesStore.getRepository(this.props.params.username, this.props.params.repository).then(data => {
			const cooleys = 'X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n';
			console.log(data);
			this.renderNotes(cooleys);
		});
	}

	// eslint-disable-next-line
	renderNotes(abc_string) {
		// const tunebook = new window.ABCJS.TuneBook(abc_string);
		window.ABCJS.renderAbc('notation', abc_string, undefined, { staffwidth: 1000, scale: 1 });
		// const tuneObjectArrayMIDI = window.ABCJS.renderMidi('midi', abc_string);
	}

	// eslint-disable-next-line
	handleDrop = (acceptedFiles, rejectedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('repository', this.props.params.repository);
		this.props.repositoriesStore.uploadFile(formData, this.props.params.repository);
	}

 	render() {
		return (
			<section className="Repository">
					<Dropzone onDrop={this.handleDrop}>
						{({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
					    if (isDragActive) {
					      return 'This file is authorized';
					    }
					    if (isDragReject) {
					      return 'This file is not authorized';
					    }
					    return acceptedFiles.length || rejectedFiles.length
					      ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
					      : 'Try dropping some files.';
					  }}
					</Dropzone>
				<div className="container">
					<h1>{this.props.params.repository}</h1>
					<div className="row Repository__panel">
						<div className="col-md-3">
							<p><Link to="/">15 commits</Link></p>
						</div>
						<div className="col-md-3">
							<p><Link to="/">Collaborators</Link></p>
						</div>
						<div className="col-md-3">
							<p><Link to="/">Download</Link></p>
						</div>
						<div className="col-md-3">
							<p><Link to="/">Commit</Link></p>
						</div>
					</div>
					<div className="Repository__view">
						<div id="notation" />
					</div>
				</div>
			</section>
		);
	}
}

export default Repository;
