let routes = require('./models/Routes');
var jwt = require('jsonwebtoken');
let secret = require('./secret.json');
// let db = require('./database');
// db.connect('localhost', 28015, '{admin_pass}', 'doMore');


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
let username = request.param.username;
let password = request.param.password;


// sign with RSA SHA256
var cert = secret.private_key; // get private key
var token = jwt.sign({ deviceID: '1' }, cert);
let data = {
	"token" : token
};

reply(data);

});

module.exports = routes.getRoutes();

