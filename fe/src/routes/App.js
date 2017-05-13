import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Header } from '../components';
import './App.scss';

@inject('uiStore')
@observer
class App extends Component {
	render() {
		const { uiStore, children } = this.props;

		return (
			<div className="App">
				<div className="App__container">
					<Header uiStore={uiStore} />
					{children}
					<div className="App__empty" />
				</div>
			</div>
		);
	}
}

export default App;
