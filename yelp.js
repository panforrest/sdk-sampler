var express = require('express');
var router = express.Router();
var Yelp = require('yelp');

router.get('/', function(req, res, next) {

	var term = req.query.term
 
	var yelp = new Yelp({
	    consumer_key: 'Ro0KpfSZ5Sy8H0IrIGumeQ',
	    consumer_secret: 'bxCVFxHK87gGOgURQ_L8bBYDEAc',
	    token: 'i8awP23vxA-lSKvCzP-aa7h-0X18oX7b',
	    token_secret: 'A9wCEcRMxegR5_z1syaGu26_lxc',
	});

    // res.json({
    //     confirmation: 'Yelp route'
    // });

	yelp.search({ term: term, location: 'Montreal' })
	.then(function (data) {
	    res.json({
	        confirmation: 'Success',
	        result: data
	    });
	    return
	})
	.catch(function (err) {
	    //console.error(err);
	    res.json({
	        confirmation: err
	    });
	});    
});

module.exports = router;