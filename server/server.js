const Hapi = require('hapi');


// Create a server with a host and port
const server = new Hapi.Server();

server.connection({ 
    host: 'localhost', 
    port: 8000 
});

/* Register plugins */
server.register(require('vision'), (err) => {

    if (err) {
        console.log("Failed to load vision.");
    }
});
server.register({  
  register: require('inert')
}, function(err) {
  if (err) throw err
});


server.views({  
    engines: {
        html: require('handlebars')
    },
    path: './client/views',
    layoutPath: './client/layouts',
    layout: 'default',
    //helpersPath: 'views/helpers',
    partialsPath: './client/partials'
});





//Set routes
let routes = require('./routes');
server.route(routes);



server.start((err) => {
    if (!err) console.log("Server running at :" + server.info.uri);
    else console.log(err); 
    // let db = require('./database');
    // db.connect('localhost', 28015, '', 'Fitr');

});





