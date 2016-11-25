var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

router.get('/:action', function(req, res, next) {
    var actions = ['timeline', 'search']
    var action = req.params.action

    if (actions.indexOf(action) == -1){
    	res.json({
    		confirmation: 'fail',
            message: 'Invalid action. Please select search or timeline.'
    	})

    	return
    }

	var client = new Twitter({
	  consumer_key: 'eq09Tts3bLDQzGRf4a1VXDNGw',
	  consumer_secret: 'boonuJfSQlL9W3tlCV2hR86v2JukscfxNJ9PWOVwRAmLkhp8wz',
	  access_token_key: '158018675-xrS1KU3Q73OVtJZy2u6CyKhZE2UFpMwPcbCEthtL',
	  access_token_secret: 'DAhuIjLQFp1FyK2QCtW2o0o9Stn7JqNDm2xatOK4owZdA'	  
	});

    var params = {}
    var url = null

    if (action == 'timeline'){
    	params['screen_name'] = req.query.username
    	url = 'statuses/user_timeline'
    }
    else if (action == 'search'){
    	params['q'] = req.query.term
    	url = 'search/tweets'
    }

	client.get(url, params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }

	  var list = (tweets.statuses == null) ? tweets : tweets.statuses

	  var title = (action == 'timeline') ? params['screen_name']: params['q']

	  var content = {
	  	title: title,
	  	tweets: list
	  }

	  res.render('twitter', content)
	});

	return

  //   if (action == 'timeline'){
  //   	var username = req.query.username

		// var params = {screen_name: username};
		// client.get('statuses/user_timeline', params, function(error, tweets, response) {
		//   if (!error) {
		//     console.log(tweets);
		//   }

		//   var content = {
		//   	title: username,
		//   	tweets: tweets
		//   }

		//   res.render('twitter', content)
		// });

		// return

  //   }

  //   if (action == 'search'){
  //   	var search = req.query.term
  //       var params = {q: search}
		// client.get('search/tweets', params, function(error, tweets, response) {

		//   if (!error) {
		//     console.log(tweets);
		//   } 
		//   var content = {
  //           title: search,
		//   	tweets: tweets.statuses
		//   }

		//   res.render('twitter', content)

		// });

		// return
  //   }
});

// router.get('/:action', function(req, res, next) {
//     var actions = ['timeline', 'search']
//     var action = req.params.action

//     if (actions.indexOf(action) == -1){
//     	res.json({
//     		confirmation: 'fail',
//             message: 'Invalid action. Please select search or timeline.'
//     	})

//     	return
//     }

// 	var client = new Twitter({
// 	  consumer_key: 'eq09Tts3bLDQzGRf4a1VXDNGw',
// 	  consumer_secret: 'boonuJfSQlL9W3tlCV2hR86v2JukscfxNJ9PWOVwRAmLkhp8wz',
// 	  access_token_key: '158018675-xrS1KU3Q73OVtJZy2u6CyKhZE2UFpMwPcbCEthtL',
// 	  access_token_secret: 'DAhuIjLQFp1FyK2QCtW2o0o9Stn7JqNDm2xatOK4owZdA'	  
// 	});

//     if (action == 'timeline'){
//     	var username = req.query.username

// 		var params = {screen_name: username};
// 		client.get('statuses/user_timeline', params, function(error, tweets, response) {
// 		  if (!error) {
// 		    console.log(tweets);
// 		  }

// 		  var content = {
// 		  	title: username,
// 		  	tweets: tweets
// 		  }

// 		  res.render('twitter', content)
// 		});

// 		return

//     }

//     if (action == 'search'){
//     	var search = req.query.term
//         var params = {q: search}
// 		client.get('search/tweets', params, function(error, tweets, response) {

// 		  if (!error) {
// 		    console.log(tweets);
// 		  } 
// 		  var content = {
//             title: search,
// 		  	tweets: tweets.statuses
// 		  }

// 		  res.render('twitter', content)

// 		});

// 		return
//     }
// });

module.exports = router;