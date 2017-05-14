import { observable, action } from 'mobx';
import { getRepositories } from '../api/core/repositories';

export class RepositoriesStore {
	@observable repositories = [];

	@action getRepositories(username) {
		getRepositories(username).then(data => {
			console.log(data, this);
		})
	}
}
