import React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import App from './App';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import Login from './Login/Login';

export const UnAuthorisedRouting = (
	<Route path="/" component={App} >
		<IndexRoute component={Home} />
		<Route path="/login" component={Login} />
		<Redirect from="*" to="/" />
	</Route>
);

export const AuthorisedRouting = (
	<Route path="/" component={App}>
		<IndexRedirect to="/" />
		<Route path="*" component={NotFound} />
	</Route>
);

// <Route path="/dashboard/:subPage" component={Dashboard} />
// <Redirect from="/dashboard" to="/dashboard/projects" />
