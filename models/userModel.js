//Load required packages
var mongoose = require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var userSchema = new mongoose.Schema(
{
	username:{
				type:String,
				unique:true,
				required:true
	},
	password:{
		type:String,
		required:true
	}
});

//Execute before each user.save() call
userSchema.pre('save',function(callback){
	var user = this;

	//break out if the password hasn't changed
	if(!user.isModified('password'))
		return callback();
	//password changed so we neet to hash it
	bcrypt.genSalt(5,function(err,salt){
		if(err)
			return callback(err);

		//hashing passwd
		bcrypt.hash(user.password,salt,null,function(err,hash){
			if(err)
				return callback(err);
			user.password = hash;
			callback();
		});//hash
	});//genSalt
});
//methid to verify password

userSchema.methods.verifyPassword = function(password,callback){
	bcrypt.compare(password,this.password,function(err,isMatch){
		if(err)
			callback(err);
		callback(null,isMatch);
	});
};

//export the Mongoose userModel
module.exports=mongoose.model('User',userSchema);