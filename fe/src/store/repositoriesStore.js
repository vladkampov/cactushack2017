import { observable, action } from 'mobx';
import { getRepositories, createRepository } from '../api/core/repositories';

export class RepositoriesStore {
	@observable repositories = [];

	@action getRepositories(username) {
		getRepositories(username).then(data => {
			this.repositories = data.results;
		});
	}

	@action createRepository(username, title, description) {
		return createRepository(username, title, description).then(data => {
			this.repositories.push(data);
			return data;
		});
	}
}

