var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

router.get('/', function(req, res, next) {

	var username = req.query.username

	if (username == null) {
		res.json({
			confirmation: 'fail',
			message: 'Please enter a username'
		})

		return
	}

	var client = new Twitter({
	  consumer_key: 'eq09Tts3bLDQzGRf4a1VXDNGw',
	  consumer_secret: 'boonuJfSQlL9W3tlCV2hR86v2JukscfxNJ9PWOVwRAmLkhp8wz',
	  access_token_key: '158018675-xrS1KU3Q73OVtJZy2u6CyKhZE2UFpMwPcbCEthtL',
	  access_token_secret: 'DAhuIjLQFp1FyK2QCtW2o0o9Stn7JqNDm2xatOK4owZdA'	  
	});

	var params = {screen_name: username};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }

	  res.json(tweets)
	});


});

module.exports = router;