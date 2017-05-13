import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import './index.scss';

ReactDOM.render(
	<Provider {...store}>
		<Router history={browserHistory}>
			{ store.uiStore.user.id ? AuthorisedRouting : UnAuthorisedRouting }
		</Router>
	</Provider>,
	document.getElementById('root')
);
