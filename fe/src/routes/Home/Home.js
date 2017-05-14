import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {
	componentDidMount() {
		const abcString = '"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|';

		window.ABCJS.renderAbc('notation', abcString, undefined, { staffwidth: 1000, scale: 1 });
	}

	render() {
		return (
			<section className="Home">
				<div className="container">
					<img src="/bender.png" width="150" alt="" />
					<h1>Make music in a proper way <br />
					<small>Collaborate your ideas.</small></h1>

					<div id="notation" />
				</div>
			</section>
		);
	}
}

export default Home;
