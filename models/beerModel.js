var mongoose =require('mongoose');

//define beer schema
var BeerSchema =new mongoose.Schema({
	name:String,
	type:String,
	quantity:Number,
	userId:String
});

//export the mongoose model
module.exports = mongoose.model('Beer',BeerSchema);