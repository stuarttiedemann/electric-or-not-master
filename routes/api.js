var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/electric';
var Photo = require('../models/photos');
var Users = require('../models/users');

var db;
var mongoose = require('mongoose');
mongoose.connect(mongoUrl);


/* GET photos page. */
router.get('/photos/get', function(req, res, next) {
	Photo.find(function(err,photosResult){
		if(err){
			console.log(err);
		}else{
			res.json(photosResult);
		}
	});
});

router.post('/photos/post',function(req,res,next){
	var photo = new Photo();
	photo.image = req.body.image;
	photo.totalVotes = 0;
	console.log(photo.image);
	photo.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.json({message: 'Photo added'});
		}
	})
});

router.put('/photos/update', function(req, res, next){
	Photo.findById(req.params.photo_id, function(err,photoResult){
		if(err){
			console.log(err);
		}else{
			photoResult.image = req.body.photo; // Change the property of the object we got from Mongo
			photoResult.save(function(err){
				if(err){
					console.log(err);
				}else{
					res.json({message:'Photo was updated'});
				}
			});
		}
	});
	
});

router.delete('/photos/delete', function(req, res, next){
	Photo.remove({
		_id: req.params.photo_id
	},function(err,photo){
		if(err){
			console.log(err);
		}else{
			res.json({message:"Successfully Deleted"});
		}
	
	});
})


router.get('/users/get', function(req, res, next) {
	Users.find(function(err,usersResult){
		if(err){
			console.log(err);
		}else{
			res.json(usersResult);
		}
	});
});
module.exports = router;


