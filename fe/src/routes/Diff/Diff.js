import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import './Diff.scss';

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
			this.renderNotes(data.sources.before, data.sources.after);
			console.log(data);
		});
	}
	// eslint-disable-next-line
	renderNotes(old_abc_string, new_abs_string) {
		// const tunebook = new window.ABCJS.TuneBook(abc_string);
		window.ABCJS.renderAbc('old_notation', old_abc_string, undefined, { staffwidth: 500, scale: 0.8, add_classes: true });
		window.ABCJS.renderAbc('new_notation', new_abs_string, undefined, { staffwidth: 500, scale: 0.8, add_classes: true });
		// window.ABCJS.renderMidi('midi', abc_string, undefined)
		// const tuneObjectArrayMIDI = window.ABCJS.renderMidi('midi', abc_string);

		// const l = '.l' + Math.floor(el / 4)
  //   const m = '.m' + (el % 4 - 1)
		//     	$('#notesOld ' + l + m).map (i, el)->
		//     		$(el).attr('fill', 'red')
		//     	$('#notesNew ' + l + m).map (i, el)->
		//     		$(el).attr('fill', 'green')
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
					</h1>
					<div className="row">
						<div className="col-md-6">
							<h3>Old version <small>#{this.props.params.oldHash}</small></h3>
							<div id="old_notation" />
							<div id="old_midi" />
						</div>
						<div className="col-md-6">
							<h3>Actual version <small>#{this.props.params.newHash}</small></h3>
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
