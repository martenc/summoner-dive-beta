Build status: 
[ ![Codeship Status for martenc/summoner-dive](https://codeship.com/projects/2b5f4f60-b66b-0132-677e-364f89ca8665/status?branch=master)](https://codeship.com/projects/71032)

DEMO:  http://summoner-dive.herokuapp.com


# Summoner Dive (beta)

![summoner-dive!](http://cdn.leagueoflegends.com/game-info/1.1.9/images/content/gi-champions.jpg)


Thank you for your interest! Essentially, this app allows you to search and do a "dive" into the details of a specified summoner. Summoners, of course, are players of the face meltingly awesome game known as ...League of Legends! 


What this app does in a nutshell:
- Connects to the Riot Games API
- Provides a mechanism for the user to specify a summoner name
https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/riotschmick?api_key=<your_key>

- Retrieves the most recent match history for that summoner
https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/585897?api_key=<your_key>

- Reports on the wins/losses for that summoner
https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/585897/summary?api_key=<your_key>

- Provides visibility into what champions that summoner played
https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/585897/ranked?api_key=<your_key>
https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/90?api_key=<your_key>



It's a simple NEH app (Nodejs, Express, Handlebars), so all you'll need is the following to get going...


## Configuration

1. Follow the instructions for creating an app found here:  https://developer.riotgames.com
2. Make sure you have your api_key handy after you sign up
3. Download or clone this repo


## Installation

1. Specify your own api key within the key.js found in the config directory
2. If you're hosting your app on heroku (or similar) you can specify the environmental variable containing your key. Otherwise you can hard code them in the key.js file ...but be sure to keep them safe and secret!
3. I've provided a notes.txt file as well to help you along with some example endpoints
4. Enjoy!


## Build

1. run "npm update"
2. launch your nodejs app which will be running on: http://localhost:8080


### Legal

Summoner Dive isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.


### License
This is licensed under the MIT license.
