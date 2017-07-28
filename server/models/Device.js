
class Device {
	constructor(id) {
		this.id = id || -1;
	}

	create(created, unit){
		this.created = created;
		this.unit = unit;
	}

	createFromBundle(bundle) {
		this.unit = bundle.unit;
		this.created = bundle.created;
	}

	getBundle() {
		return {
			id : this.id,
			unit : this.unit,
			created : this.created
		};
	}

	prettyPrint() {
		console.log(JSON.stringify(this.getBundle(), null, 2));
	}

}

module.exports = Device;