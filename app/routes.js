module.exports = function(app, api, details) {

	// PAGE ROUTES =============================================================
	// home
	app.get('/', function(req, res) {
	    res.render('index.html');
	});

	// summoner deails
	app.get('/summoner/:id/:name', details.getSummonerDetailsByID);
	

	// API ROUTES =============================================================
	// lookup summoner by name
	app.get('/getsummoner/:name', api.getSummonerByName);

	// get champions
	app.get('/getchampions', api.getChampions);
}