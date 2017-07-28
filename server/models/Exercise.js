
class Exercise {
	constructor(id) {
		this.id = id || -1;
	}

	create(name, device){
		this.name = name;
		this.device = device;
	}

	createFromBundle(bundle) {
		this.name = bundle.name;
		this.device = bundle.device;
	}

	getBundle() {
		return {
			id : this.id,
			name : this.name,
			device : this.device
		};
	}

	prettyPrint() {
		console.log(JSON.stringify(this.getBundle(), null, 2));
	}

}

module.exports = Exercise;