const express = require('express');
const app = express();

const path = require('path');
const request = require('request');

app.use(express.static(path.join(__dirname, '../client/dist/')));

if(typeof(process.env.NODE_PORT) !== 'undefined') {
  port = process.env.NODE_PORT;
} else {
  port = 3000; // Default port
}

app.listen(port, function() {
    console.log('Listening on ' + port);
});
  
app.enable('trust proxy');
  
app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});
  