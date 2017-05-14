import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './App';
import Account from './Account/Account';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Repository from './Repository/Repository';
import CreateRepository from './CreateRepository/CreateRepository';
import Commit from './Commit/Commit';
import CommitsList from './CommitsList/CommitsList';

export const UnAuthorisedRouting = (
	<Route path="/" component={App} >
		<IndexRoute component={Home} />
		<Route path="/login" component={Login} />
		<Redirect from="*" to="/" />
	</Route>
);

export const AuthorisedRouting = (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/user/:username" component={Account} />
		<Route path="/user/:username/create" component={CreateRepository} />
		<Route path="/user/:username/:repository" component={Repository} />
		<Route path="/user/:username/:repository/push" component={Commit} />
		<Route path="/user/:username/:repository/changes" component={CommitsList} />
		<Route path="*" component={NotFound} />
	</Route>
);

// <Route path="/dashboard/:subPage" component={Dashboard} />
// <Redirect from="/dashboard" to="/dashboard/projects" />
