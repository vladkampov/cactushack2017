import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
// import './Diff.scss';

@inject('repositoriesStore')
@observer
class Diff extends Component {
	static defaultProps = { params: {} };
	constructor(props) {
		super(props);

		this.state = {
			track: ''
		};
	}

	componentDidMount() {
		this.props.repositoriesStore.getDiff(this.props.params.oldHash, this.props.params.newHash).then(data => {
			console.log(data);
		});
	}
	// eslint-disable-next-line
	renderNotes(abc_string) {
		// const tunebook = new window.ABCJS.TuneBook(abc_string);
		window.ABCJS.renderAbc('notation', abc_string, undefined, { staffwidth: 1000, scale: 1 });
		// window.ABCJS.renderMidi('midi', abc_string, undefined)
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
			<section className="Diff">
				<div className="container">
					<h1><Link to={`/user/${this.props.params.username}`}>{this.props.params.username}</Link> <small><i className="fa fa-arrow-circle-o-right" aria-hidden="true" /></small> {this.props.params.repository}
							<Link to={`/user/${this.props.params.username}/${currentRepository.title}/push`} className="btn btn-success pull-right">Make changes</Link>
					</h1>
					<div className="row">
						<div className="col-md-6">
							<div id="old_notation" />
							<div id="old_midi" />
						</div>
						<div className="col-md-6">
							<div id="new_notation" />
							<div id="new_midi" />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Diff;
