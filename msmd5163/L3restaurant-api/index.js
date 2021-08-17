//import and setting up middleware
var express = require('express'); //call express
var app = express(); //define our app using express
var mongoose = require('mongoose');
var router = express.Router();


//made connection
mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.3dagi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//define classes
var Restaurant = require('./restaurant');


// Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var port = process.env.PORT || 8082; //set our port

//Setting route and path

router.get('/', (req, res) => {
    res.json({ message: 'Hula! my API works!!!' })
});


//Fetch all documents
router.get('/restaurants', function(req, res, next) {
    Restaurant.find({}).then(function (restaurant) {
        res.send(restaurant);
    }).catch(next);
});


//add new document
router.post('/restaurants', (req, res) => {
    let newRestaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        opening_time: req.body.opening_time,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        types: req.body.types
    });

    //method save by mongoose to store newRestaurant model data in db
    newRestaurant.save((err) => {
        if (err) res.json({ error: 'message' + err })
        res.json({ message: 'Restaurant succesfully created!' });
    });
});

//add menu into existing document
router.post('/restaurants/:id/menus', (req, res) => {


});

//update documents
router.post('/restaurants/:id/reviews', (req, res) => {


});




//update documents
router.put('/restaurants/:id/menus/:menu_id', (req, res) => {

});

//update documents
router.put('/restaurants/:id/reviews/:review_id', (req, res) => {

});




//delete document
router.delete('/restaurants/:id/menus/:menu_id', (req, res) => {

});

//delete specific data in documents
router.delete('/restaurants/:id/reviews/:review_id', (req, res) => {
    
});





//filter documents
router.get('/restaurants/:id/reviews/:review_id', (req, res) => {


});


//filter documents
router.get('/restaurants/:id/menus', (req, res) => {
    Restaurant.findById((err, restaurant) => {
        if (err) res.json({ error: "Getting error!" + err });
        res.json({ message: "Fetching restaurant with id..", data: restaurant });
    });
});

//filter documents
router.get('/restaurants/:res_id/menus/:menu_id', (req, res) => {

});

//filter documents
router.get('/restaurants/:id/reviews', (req, res) => {
});


//Get specific data from db
router.get('/restaurants/:id', (req, res) => {
    Restaurant.findById((err, restaurant) => {
        if (err) res.json({ error: "Getting error!" + err });
        res.json({ message: "Fetching restaurant with id..", data: restaurant });
    });
});



app.use('/api',router);
app.listen(port); // create a server that browsers can connect to
console.log("Magic happened at port "+port);