/*

  Generally helpful method for making https calls to your api

*/

var querystring = require('querystring');
var https = require('https');

exports.performRequest = function(host, endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      //console.log(responseString);
      var responseObject = '';
      try {
        responseObject = JSON.parse(responseString);
      } catch(err) {
        console.log('ERROR CALLING RIOT API: '+responseString);
      }
      success(responseObject);      
    });
  });

  req.write(dataString);
  req.end();
}