/**
 * Created by Remus on 31/05/2018
 */
var http = require('http');

const port = process.env.PORT || 3000;


function Server(app){
    return http.createServer(app).listen(port);
}

module.exports = Server;