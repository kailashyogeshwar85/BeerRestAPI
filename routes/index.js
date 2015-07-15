var express = require('express');
var router = express.Router();
var Beer = require('../models/beerModel');
var beerController=require('../controllers/beerController');
var userController=require('../controllers/userController');
var authController=require('../controllers/auth');//auth controller for api routes

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(	
  			{
  				message:"You are running low on beers"
  			});
});
// create endpoint handlers for api/beers
router.route('/beers')
		.post(authController.isAuthenticated,beerController.addBeers)
		.get(authController.isAuthenticated,beerController.getBeers);

// create end point for GET,PUT,DELETE for a single object
router.route('/beers/:beer_id')
		.get(authController.isAuthenticated,beerController.getBeer)
		.put(authController.isAuthenticated,beerController.updateBeer)
		.delete(authController.isAuthenticated,beerController.deleteBeer);

//endpoint for viewing the user api/users GET
router.route('/users')
		.post(userController.addUser)
		.get(authController.isAuthenticated,userController.getUsers);		

module.exports = router;
