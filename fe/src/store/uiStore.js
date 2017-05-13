import { observable } from 'mobx';

export default class UiStore {
	@observable access_token = null; // eslint-disable-line camelcase
	@observable user = {};
}
