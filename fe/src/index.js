import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import DomainStore from './store/domainStore';
import UiStore from './store/uiStore';
import { AuthorisedRouting, UnAuthorisedRouting } from './routes/Routing';
import './index.scss';

const store = Object.assign({}, new DomainStore(), { uiStore: new UiStore() });

ReactDOM.render(
	<Provider {...store}>
		<Router history={browserHistory}>
			{ store.uiStore.user.id ? AuthorisedRouting : UnAuthorisedRouting }
		</Router>
	</Provider>,
	document.getElementById('root')
);
