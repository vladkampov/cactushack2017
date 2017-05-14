import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Header } from '../components';
import './App.scss';

@inject('uiStore')
@observer
class App extends Component {
	componentDidMount() {
		this.props.uiStore.getUser();
	}

	render() {
		const { uiStore, children } = this.props;

		return (
			<div className="App">
				<div className="App__container">
					<Header token={uiStore.access_token} username={uiStore.user.username} />
					{children}
				</div>
			</div>
		);
	}
}

export default App;
