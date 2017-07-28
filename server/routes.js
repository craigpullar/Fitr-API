let routes = require('./models/Routes');
var jwt = require('jsonwebtoken');
let secret = require('./secret.json');
let db = require('./database');
let r = require('rethinkdb');
require("./models/Device");
require("./models/Exercise");
require('./models/Set');

let globals = require('./globals');

db.connect('localhost', 28015, '', 'Fitr', () => {

});

let verify = (token, private, callback) => {
	jwt.verify(token, private, (err, decoded) => {
		if(err)
			return err;
		else 
			callback();
	});
};


//API Routes
routes.addRoute('GET','/api/v0.1', (request, reply) => {
	let data = {
		"API Version" : "0.1",
		"Date Created" : "21/07/17"
	}
	reply(data);
});
routes.addRoute('POST','/api/v0.1/getToken', (request, reply) => {
// sign with default (HMAC SHA256)

//Verify secret against DB of devices
let client_secret = request.params.client_secret;

//Verify User & pass against DB of users
let device_id = request.param.device_id;


// sign with RSA SHA256
var cert = secret.private_key; // get private key
var token = jwt.sign({ client: client_secret }, cert);
let data = {
	"token" : token
};

reply(data);

});

//DEVICES
routes.addRoute('GET', '/api/v0.1/device', (request, reply) => {
//GET ALL DEVICES
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('devices').run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});

});
routes.addRoute('GET', '/api/v0.1/device/{id}', (request, reply) => {
//GET Device with id
verify(request.params.token, secret.private_key, () => {
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('devices').filter(db.r.row('id').eq(request.params.id))
	.run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});


});
routes.addRoute('POST', '/api/v0.1/device', (request, reply) => {
//ADD NEW DEVICE
verify(request.params.token, secret.private_key, () => {
let new_device = new Device(globals.tk);
new_device.createfromBundle(request.params);
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('devices').insert(new_device.getBundle()).run(connection, function(err, result) {
		if (err) throw err;
		reply(result);
	})
});
});

});
routes.addRoute('POST', '/api/v0.1/device/{id}', (request, reply) => {
//UPDATE DEVICE WITH ID
verify(request.params.token, secret.private_key, () => {
let device = new Device(require.params.id);
device.createfromBundle(request.params);
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('devices').filter(db.r.row('id').eq(request.params.id))
	.update(device.getBundle())
	.run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});

});

//Exercise
routes.addRoute('GET', '/api/v0.1/exercise', (request, reply) => {
//GET ALL Exercises
verify(request.params.token, secret.private_key, () => {
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('exercises').run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});


});
routes.addRoute('GET', '/api/v0.1/exercise/{id}', (request, reply) => {
//GET Exercise with id
verify(request.params.token, secret.private_key, () => {
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('exercises').filter(db.r.row('id').eq(request.params.id))
	.run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});

});
routes.addRoute('POST', '/api/v0.1/exercise', (request, reply) => {
//ADD NEW Exercise
verify(request.params.token, secret.private_key, () => {
let new_exercise = new Exercise(globals.tk);
new_exercise.createfromBundle(request.params);
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('exercises').insert(new_exercise.getBundle()).run(connection, function(err, result) {
		if (err) throw err;
		reply(result);
	})
});
});

});
routes.addRoute('POST', '/api/v0.1/exercise/{id}', (request, reply) => {
//UPDATE Exercise WITH ID
verify(request.params.token, secret.private_key, () => {
let exercise = new Exercise(require.params.id);
exercise.createfromBundle(request.params);
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('exercises').filter(db.r.row('id').eq(request.params.id))
	.update(exercise.getBundle())
	.run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});
});
routes.addRoute('GET', '/api/v0.1/exercise/device_id={id}', (request, reply) => {
//Get all exercises with device id
verify(request.params.token, secret.private_key, () => {
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('exercises').filter(db.r.row('device_id').eq(request.params.id))
	.run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});

});

//Set
routes.addRoute('GET', '/api/v0.1/set', (request, reply) => {
//GET ALL Sets
verify(request.params.token, secret.private_key, () => {
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('sets').run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});

});
routes.addRoute('GET', '/api/v0.1/set/{id}', (request, reply) => {
//GET set with id
verify(request.params.token, secret.private_key, () => {
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('sets').filter(db.r.row('id').eq(request.params.id))
	.run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});

});
routes.addRoute('POST', '/api/v0.1/set', (request, reply) => {
//ADD NEW set
verify(request.params.token, secret.private_key, () => {
let new_set = new Set(globals.tk);
new_set.createfromBundle(request.params);
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('sets').insert(new_sets.getBundle()).run(connection, function(err, result) {
		if (err) throw err;
		reply(result);
	})
});
});

});
routes.addRoute('POST', '/api/v0.1/set/{id}', (request, reply) => {
//UPDATE set WITH ID
verify(request.params.token, secret.private_key, () => {
let set = new Set(require.params.id);
set.createfromBundle(request.params);
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('sets').filter(db.r.row('id').eq(request.params.id))
	.update(set.getBundle())
	.run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});

});
routes.addRoute('GET', '/api/v0.1/set/device={id}', (request, reply) => {
//Get all set with device id
verify(request.params.token, secret.private_key, () => {
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('sets').filter(db.r.row('device_id').eq(request.params.id))
	.run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});

});
routes.addRoute('GET', '/api/v0.1/set/date={date}', (request, reply) => {
//Get all set with date
verify(request.params.token, secret.private_key, () => {
db.connect('localhost', 28015, '', 'Fitr', () => {
	db.r.table('sets').filter(db.r.row('date').eq(request.params.date))
	.run(db.conn, function(err, cursor) {
		if (err) throw err;
		cursor.toArray(function(err, result) {
			if (err) throw err;
			reply(result);
		});
	});
});
});

});
module.exports = routes.getRoutes();

