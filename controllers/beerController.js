//Load required package
var Beer =require('../models/beerModel.js');

// create endpoint for /api/beers POST 
//export post method
exports.addBeers=function(req,res){
	//new instance
	var beer=new Beer();

	//setting data from post call
	beer.name=req.body.name;
	beer.type=req.body.type;
	beer.quantity=req.body.quantity;
	beer.userId=req.user._id;

	//save beer if not any error
	beer.save(function(err){
		if(err)
			res.send(err);
		console.log("saving beer to locker");
		res.json({
				   message:"beer added successfully to the locker",
				   data:beer
				 });
	});
};
//end point for get all beers api/beers
exports.getBeers=function(req,res){
	//use Beer model to find al collection
	Beer.find({userId:req.user._id},function(err,beers){
		if(err)
		{
			res.send(err);
		}
		console.log("geting allbeers to locker");
		res.json(beers);
	})
};

//end point for api/beers/beer_id
exports.getBeer=function(req,res){
		//use Beer model to find the single object
		Beer.find({ userId: req.user._id, _id: req.params.beer_id },function(err,beer){
			if(err)
				res.send(err);
			console.log("geting a beer to locker");
			res.json(beer);
		});
};

//endpoint for api/beers/beer_id PUTcall
exports.updateBeer=function(req,res){
		//use beer model to find specific beer by userId
		Beer.update({ userId: req.user._id,_id: req.params.beer_id},{quantity: req.body.quantity },function(err,num,raw){
			if(err)
				res.send(err);
			res.json({ message : num + 'updated' });
		});		
};

//create end pont for DELETE call on api/beers/beer_id
exports.deleteBeer=function(req,res){

		//find by id and remove
		Beer.remove({userId: req.user._id, _id: req.params.beer_id },function(err){
			if(err)
			{
				req.send(err)
			}
			console.log("deleting beer from locker");
			res.json({message:"Beer deleted from the locker!!"});
		});
};