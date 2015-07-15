var passport=require('passport');
var BasicStrategy=require('passport-http').BasicStrategy;
var User=require('../models/userModel');


passport.use(new BasicStrategy(
	function(username,password,callback){
		User.findOne(
				{ username:username },function(err,user){
					if(err) {return callback(err);}

					//if no user found with that name
					if(!user) { return callback(null,false); }

					//make sure passwd is correct
					user.verifyPassword(password,function(err,isMatch){
						if(err) { return callback(err); }

						//paswd didnt match
						if(!isMatch) { return callback(null,false); }

						//success
						return callback(null,user);
					});
				});	
	       }
	));
exports.isAuthenticated =passport.authenticate('basic',{ session : false });