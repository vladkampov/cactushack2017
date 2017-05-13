import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import { Header } from '../../components';

@inject('uiStore')
@observer
class Home extends Component {
	render() {
		return (
			<section className="Home">
				<div className="container">
					<h1>Make music in a right way</h1>
					<h2>ololo</h2>
				</div>
			</section>
		);
	}
}

export default Home;
