class Database {

	constructor(){
	}

	connect(host,port,pass,name, callback){
		this.host = host;
		this.port = port;
		this.pass = pass;
		this.name = name;
		this.conn = null;
		this.r = require('rethinkdb');
		this.r.connect({host : host, port : port, pass : pass}, (err, conn) => {
			if (err) console.log(err);
			this.conn = conn;
			this.conn.db = name;
			console.log('Connected to db: ' + this.name);
			callback();
		});
	}
}

module.exports = new Database();