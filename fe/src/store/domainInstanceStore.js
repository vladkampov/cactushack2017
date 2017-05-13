import { observable, computed, action } from 'mobx';

export class DomainInstanceStore {
	@observable isLoading = false;
	@observable instances = [];
	@observable activeInstanceId = ''; // correspond to id of instance on details page

	constructor(instanceClass, getInstances, getInstance) {
		this.InstanceClass = instanceClass;
		this.getInstancesCb = getInstances;
		this.getInstanceCb = getInstance;
	}

	@computed get instancesAmount() {
		return this.instances.length;
	}

	@computed get activeInstance() {
		return this.instances.find(i => i.id === this.activeInstanceId) || new this.InstanceClass(this, {});
	}

	@action getInstances() {
		this.isLoading = true;

		return this.getInstancesCb().then(instances => {
			this.instances = instances.map(i => new this.InstanceClass(this, i));
			this.isLoading = false;
		});
	}

	@action getInstance(id) {
		this.activeInstanceId = id;

		if (!this.activeInstance.id) {
			this.isLoading = true;
		}

		return this.getInstanceCb(id).then(inst => {
			const instance = new this.InstanceClass(this, inst); // eslint-disable-line no-use-before-define

			if (!this.activeInstance.id) {
				this.instances.push(instance);
			}
			else {
				this.activeInstance.fromJSON(inst);
			}

			this.isLoading = false;
		});
	}
}


export class DomainInstance {
	store = null;
	id = null;

	constructor(store, json) {
		this.store = store;

		if (json.id) {
			this.fromJSON(json);
		}
	}

	fromJSON(json) {
		Object.keys(json).forEach(key => {
			this[key] = json[key];
		});
	}
}
