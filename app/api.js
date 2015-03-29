var https = require('https');
var path = require('path');
var config = require(path.relative('','../config/keys.js'));
var apihelper = require('./api_helper.js');

var host = 'na.api.pvp.net';
var riot_api_key = config.riot_api_key;


exports.getSummonerByName = function(req, res) {
	var summonerName = req.params.name;
	var api_response = apihelper.performRequest(host, 
		'/api/lol/na/v1.4/summoner/by-name/' +summonerName+ '/',
		 'GET', {
				api_key: riot_api_key
			}, function(data) {
				res.send(data);
			});
}


exports.getChampions = function(req, res) {
	var api_response = apihelper.performRequest(host, 
		'/api/lol/static-data/na/v1.2/champion/',
		 'GET', {
				api_key: riot_api_key
			}, function(data) {
				res.send(data);
			});
}