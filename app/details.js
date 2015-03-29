var https = require('https');
var path = require('path');
var config = require(path.relative('','../config/keys.js'));
var apihelper = require('./api_helper.js');
var hbs = require('hbs');	


var host = 'na.api.pvp.net';
var riot_api_key = config.riot_api_key;


exports.getSummonerDetailsByID = function(req, res) {
	var summonerId = req.params.id;
	var summonerName = req.params.name;

	var match = apihelper.performRequest(host, 
		'/api/lol/na/v2.2/matchhistory/' +summonerId+ '/',
		 'GET', {
				api_key: riot_api_key
			}, function(matchHistoryData) {
				if(matchHistoryData === '') { res.render('../views/error.html'); return;}

				var stats = apihelper.performRequest(host, 
				'/api/lol/na/v1.3/stats/by-summoner/' +summonerId+ '/summary',
				 'GET', {
						api_key: riot_api_key
					}, function(statsData) {
						if(statsData === '') { res.render('../views/error.html'); return;}
						
						var champions = apihelper.performRequest(host, 
						'/api/lol/na/v1.3/stats/by-summoner/' +summonerId+ '/ranked',
						 'GET', {
								api_key: riot_api_key
							}, function(championsData) {
								if(championsData === '') { res.render('../views/error.html'); return;}
								
								// console.log(statsData);

								res.render('../views/details.html', {
									Name: summonerName, 
									matchHistory: matchHistoryData,
									summonerStats: statsData,
									playedChampions: championsData
								});

							});
					});
			});

	hbs.registerHelper('ifCond', function(v1, v2, options) {
	  if(v1 === v2) {
	    return options.fn(this);
	  }
	  return options.inverse(this);
	});
};
