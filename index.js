var express = require("express");
var server= express();

server.get('/', function(req, res) {
  res.send("Node Server Root");
});

server.get('/station', function(req, res) {
  // read parameters
  for (const key in req.query) {
    if (key == "station") {
      // stop mplayer
      console.log("stop mplayer");
      const { exec } = require('child_process');
      exec("pkill mplayer &", (err, stdoout, stderr) => {});
      // start stream 
      console.log("playing " + req.query[key]);
      exec("mplayer http://laut.fm/" + req.query[key], (err, stdout, stderr) => {
        if (err) {
          return;
        }
      });
    }
  } 
  res.send("ok");
});

server.get('/stop', function(req, res) {
  console.log("killing mplayer");
  const { exec } = require('child_process');
  exec("pkill mplayer &", (err, stdoout, stderr) => {});
  res.send("ok");    
});


server.get('/increaseVolume', function(req, res) {
  console.log("increase volume");
  const { exec } = require('child_process');
  exec("amixer -M set PCM 5%+", (err, stdoout, stderr) => {});
  res.send("ok");
});

server.get('/decreaseVolume', function(req, res) {
  console.log("decrease volume");  
  const { exec } = require('child_process');
  exec("amixer -M set PCM 5%-", (err, stdoout, stderr) => {});
  res.send("ok"); 
});

server.listen(3000, () => {
 console.log("Server running on port 3000");
});
