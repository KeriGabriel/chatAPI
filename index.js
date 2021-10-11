// import dependencies
var express = require('express');
var app = express();
var routes = require('./chatAPI');

//console logger
var morgan = require('morgan');

//setup our app(server/middleware)
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
//console logger must be before routes
app.use(morgan('combined'));

//routes
app.use('/chatAPI', routes);

//serve out app
var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("listening on ", host, port);
});