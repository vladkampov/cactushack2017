import { RepositoriesStore } from './repositoriesStore';

export default class DomainStore {
	constructor() {
		this.repositoriesStore = new RepositoriesStore();
	}
}
