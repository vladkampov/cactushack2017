import { observable, action } from 'mobx';
import { getRepositories, createRepository } from '../api/core/repositories';
import { uploadFile } from '../api/core/tracks';

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

	@action uploadFile(file, repository) {
		uploadFile(file, repository).then(data => {
			console.log(data, this)
			return data;
		});
	}
}

