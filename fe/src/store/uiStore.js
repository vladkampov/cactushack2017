import { observable, action } from 'mobx';
import { logIn } from '../api/core/login';
import { getUser } from '../api/core/user';

export default class UiStore {
	@observable access_token = localStorage.getItem('access_token'); // eslint-disable-line camelcase
	@observable user = {};

	@action logIn = (username, password) => {
		return logIn(username, password).then(data => {
			localStorage.setItem('access_token', data.key);
			this.access_token = data.key;
		});
	}

	@action getUser = () => {
		getUser(this.access_token).then(data => {
			this.user = data;
		})
	}
}

