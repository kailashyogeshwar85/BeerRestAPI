//packages
var User=require('../models/userModel');

//create endpoints for /api/users for POST
exports.addUser=function(req,res){
	var user = new User({
		username:req.body.username,
		password:req.body.password
	});//new user instance

	//saving user
	user.save(function(err){
		if(err)
			res.send(err);

		res.json({
			message:"New Beer Drinker added to the locker room "
		});
	});
};

//create end point for /api/users GET
exports.getUsers=function(req,res){
	User.find(function(err,users){
		if(err)
			res.send(err);

		res.json(users);	
	});
};

