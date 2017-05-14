import { observable, action } from 'mobx';
import { getRepositories, createRepository, getRepository } from '../api/core/repositories';
import { uploadFile, pushCommit } from '../api/core/tracks';

export class RepositoriesStore {
	@observable repositories = [];
	@observable commitHistory = [];
	@observable currentRepository = { commits: [], tracks: [] };

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
		return uploadFile(file, repository).then(data => data);
	}

	@action getRepository(owner, title) {
		return getRepository(owner, title).then(data => {
			this.currentRepository = data.results[0];
			return data.results[0];
		});
	}

	// eslint-disable-next-line
	@action pushCommit(file) {
		return pushCommit(file).then(data => data);
	}
}
