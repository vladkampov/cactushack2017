import { observable, action } from 'mobx';
import { logIn } from '../api/core/login';

export default class UiStore {
	@observable access_token = null; // eslint-disable-line camelcase
	@observable user = {};

	@action logIn = (username, password) => {
		logIn(username, password).then(data => {
			console.log(data)
		});
	}
}
