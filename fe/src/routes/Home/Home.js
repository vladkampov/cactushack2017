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
					<h1>Home</h1>
				</div>
			</section>
		);
	}
}

export default Home;
