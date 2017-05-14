import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone'; // eslint-disable-line
import './Repository.scss';

@inject('repositoriesStore')
@observer
class Repository extends Component {
	static defaultProps = { params: {} };
	constructor(props) {
		super(props);

		this.state = {
			track: ''
		};
	}

	componentDidMount() {
		this.props.repositoriesStore.getRepository(this.props.params.username, this.props.params.repository).then(data => {
			this.renderNotes(data.track ? data.track[0].title.abc_score : undefined);
			this.setState({ track: data.tracks ? data.tracks[0].title : undefined });
		});
	}

	componentDidUpdate(prevProps, prevState) {
		this.props.repositoriesStore.currentRepository.tracks.forEach(track => {
			console.log(track.title, this.state);
			if (track.title === this.state.track) {
				this.renderNotes(track.abc_score);
			}
		});
	}

	// eslint-disable-next-line
	renderNotes(abc_string) {
		// const tunebook = new window.ABCJS.TuneBook(abc_string);
		window.ABCJS.renderAbc('notation', abc_string, undefined, { staffwidth: 1000, scale: 1 });
		window.ABCJS.renderMidi('midi', abc_string, undefined)
		// const tuneObjectArrayMIDI = window.ABCJS.renderMidi('midi', abc_string);
	}

	// eslint-disable-next-line
	handleDrop = (acceptedFiles, rejectedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('repository', this.props.params.repository);
		this.props.repositoriesStore.uploadFile(formData, this.props.params.repository).then(data => {
			window.location.reload();
		});
	}

	handleChange = e => {
		this.setState({ track: e.target.value });
	}

 	render() {
 		const { currentRepository } = this.props.repositoriesStore;

		return (
			<section className="Repository">
				<div className="container">
					<h1><Link to={`/user/${this.props.params.username}`}>{this.props.params.username}</Link> <small><i className="fa fa-arrow-circle-o-right" aria-hidden="true" /></small> {this.props.params.repository}
							<Link to={`/user/${this.props.params.username}/${currentRepository.title}/push`} className="btn btn-success pull-right">Make changes</Link>
					</h1>
					{currentRepository.commits.length ? (
						<div>
							<div className="row Repository__panel">
								<div className="col-md-3">
									<div className="form-group">
										<select className="form-control" value={this.state.track} onChange={this.handleChange}>
											{currentRepository.tracks.map(data => (
												<option key={data.title} value={data.title}>{data.title}</option>
											))}
										</select>
									</div>
								</div>
								<div className="col-md-3">
									<p><i className="fa fa-plus-square-o" aria-hidden="true" /> <Link to={`/user/${currentRepository.owner}/${currentRepository.title}/changes`}>{currentRepository.commits.length} change(s)</Link></p>
								</div>
								<div className="col-md-3">
									<p><i className="fa fa-user-o" aria-hidden="true" /> <Link to="/">Collaborators</Link></p>
								</div>
								<div className="col-md-3 text-right">
									<p><i className="fa fa-download" aria-hidden="true" /> <Link to="/">Download MIDI file</Link></p>
								</div>
							</div>
							<div className="Repository__view">
								<div id="notation" />
								<div id="midi" />
							</div>
						</div>
					) : (
						<div className="drop text-center">
							<p>Oh Uh! Your repository is empty so far. <br />Upload your <b>ABC/GTP/MIDI</b> file to start your history.</p>
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
						</div>
					)}
				</div>
			</section>
		);
	}
}

export default Repository;
