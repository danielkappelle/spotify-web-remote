const express = require('express');
const app = express();

const path = require('path');
const request = require('request');

const SpotifyWebApi = require('spotify-web-api-node');
const config = require('./config');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId : config.clientId,
    clientSecret : config.clientSecret,
    redirectUri : config.redirectUri
  });

spotifyApi.setAccessToken(config.accessToken);
spotifyApi.setRefreshToken(config.refreshToken);

function refresh(callback) {
    spotifyApi.refreshAccessToken()
    .then(function(data) {
      console.log('The access token has been refreshed!');
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      callback.call();
    }, function(err) {
      console.log('Could not refresh access token', err);
    });
}
  
app.get('/api/pause', function(req, res, next) {
    spotifyApi.pause()
    .then(function(data) {
      console.log('Pause');
      res.send(200);
    }, function(err) {
        if(err.statusCode == 401) {
            refresh(function() {
                res.redirect('/api/pause');
            });
        }
      console.error(err);
    });
});

app.get('/api/play', function(req, res, next) {
    spotifyApi.play()
    .then(function(data) {
        console.log('Play');
        res.send(200);
    }, function(err) {
        if(err.statusCode == 401) {
            refresh(function() {
                res.redirect('/api/play');
            });
        }
      console.error(err);
    });
});

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
  