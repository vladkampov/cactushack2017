import { observable, action } from 'mobx';
import { getRepositories, createRepository } from '../api/core/repositories';
import { uploadFile } from '../api/core/tracks';

export class RepositoriesStore {
	@observable repositories = [];
	@observable commitHistory = [];

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

	// eslint-disable-next-line
	@action uploadFile(file, repository) {
		uploadFile(file, repository).then(data => data);
	}
}

