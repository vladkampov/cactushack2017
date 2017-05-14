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
		const cooleys = 'X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n';

		this.renderNotes(cooleys);
	}

	// eslint-disable-next-line
	renderNotes(abc_string) {
		const tunebook = new window.ABCJS.TuneBook(abc_string);
		const tuneObjectArray = window.ABCJS.renderAbc('notation', abc_string, undefined, { staffwidth: 1000, scale: 1 });
		const tuneObjectArrayMIDI = window.ABCJS.renderMidi('midi', abc_string);
	}

	// eslint-disable-next-line
	handleDrop = (acceptedFiles, rejectedFiles) => {
		console.log(acceptedFiles, rejectedFiles);

		this.props.repositoriesStore.uploadFile(acceptedFiles[0], this.props.params.repository);
	}

 	render() {
		return (
			<section className="Repository">
					<Dropzone onDrop={this.handleDrop}>
						{({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
					    if (isDragActive) {
					      return "This file is authorized";
					    }
					    if (isDragReject) {
					      return "This file is not authorized";
					    }
					    return acceptedFiles.length || rejectedFiles.length
					      ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
					      : "Try dropping some files.";
					  }}
					</Dropzone>
				<div className="container">
					<h1>{this.props.params.repository}</h1>
					<div className="row background Repository__panel">
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
