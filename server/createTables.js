let db = require('./database');
let r = require('rethinkdb');

db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.dbCreate('Fitr').run(db.conn, (err, results) => {
		db.r.db('Fitr').tableCreate('devices').run(db.conn, function(err, result) {
			if (err) throw err;
			console.log(JSON.stringify(result, null, 2));
		});

		db.r.db('Fitr').tableCreate('exercises').run(db.conn, function(err, result) {
			if (err) throw err;
			console.log(JSON.stringify(result, null, 2));
		});

		db.r.db('Fitr').tableCreate('sets').run(db.conn, function(err, result) {
			if (err) throw err;
			console.log(JSON.stringify(result, null, 2));
		});

	});
	
});
