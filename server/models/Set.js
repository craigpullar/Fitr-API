
class Set {
	constructor(id) {
		this.id = id || -1;
	}

	create(exercise, unit, data, date){
		this.exercise = exercise;
		this.unit = unit;
		this.data = data;
		this.date = date;
	}

	createFromBundle(bundle) {
		this.exercise = bundle.exercise;
		this.unit = bundle.unit;
		this.data = bundle.data;
		this.date = bundle.date;

	}

	getBundle() {
		return {
			id : this.id,
			exercise : this.exercise,
			unit : this.unit,
			data : this.data,
			date : this.date
		};
	}

	prettyPrint() {
		console.log(JSON.stringify(this.getBundle(), null, 2));
	}

}

module.exports = Set;