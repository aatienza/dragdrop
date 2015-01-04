var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('landing.html');
});

router.get('/*', function(req, res) {
  res.render('landing.html');
});

router.post('/addField', function(req, res){

	var field = req.body;

	var db = req.db;

	var pagescollection = db.get('pages');

	pagescollection.find({page_number: parseInt(field.page_number)}, {}, function(err, pages){

		if( err ) {
			return res.send({'error': 'db error'});
		}

		if( pages.length == 0 ) {
			return res.send({'error': 'no page found??'});
		}

		if( pages.length ) {
			var page = pages[0];

			if( page.fields.length ){
				page.fields.push( field );
			} else {
				page.fields = [field]
			}
			
			pagescollection.update( {_id: page._id}, page, function(err, page){
				res.send({'success':'field added'});
			});
		}
	});
});

router.post('/clearFields', function(req, res){
	var db = req.db;

	var pagescollection = db.get('pages');

	pagescollection.find({}, {}, function(err, pages){
		for(var i = 0; i < pages.length; i++) {
			var page = pages[i];
			page.fields = [];
			pagescollection.update( {_id: page._id}, page);
		}

		res.send({'sucess': 'fields removed'});
	});
});

router.post('/getPages', function(req, res){

	var db = req.db;

	var collection = db.get('pages');

	collection.find({},{},function(e,pages){
       res.send( pages );
    });

});

module.exports = router;
