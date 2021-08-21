const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Restaurant = require('./restaurant');
const User = require('./user');

//add the modules for using JSON Web Tokens
const auth = require('./auth')();
const jwt = require('jsonwebtoken');
const config = require('./config');
const restaurant = require('./restaurant');


//MongoDB connection
mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.3dagi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Router path
var router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: "It's works!" });
});


app.use('/api', router);

//Register user
router.post('/register', (req, res) => {
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    
    newUser.save((err) => {
        if (err) {
            res.json({ error: 'message' + err });
        } else {
            res.json({ message: 'User successfully registered' });
        }
    });
});

//add new document
router.post('/restaurants', (req, res) => {
    let newRestaurant = new Restaurant({
        types: req.body.types,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        opening_time: req.body.opening_time,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    //method save by mongoose to store newRestaurant model data in db
    newRestaurant.save((err) => {
        if (err) {
            res.json({ error: 'message' + err });
        } else {
            res.json({ message: 'Restaurant succesfully created!' });
        }
        
    });
});


//Authenticate user
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log(user);
        if (user) {

            /* if (user.password === req.body.password) {
                res.json({ message: 'User authenticated' });
            } else {
                res.json({ message: 'Wrong password' });
            } */

            user.verifyPassword(req.body.password, (err, isMatch) => {
                if (err) {
                    res.json({ message: 'Something is wrong' });
                } else if (!isMatch) {
                    res.json({ message: 'Wrong password' });
                } else {
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 10080
                    });
                    res.json({ message: 'User authenticated!', token: 'JWT' + token });
                }
            });
        } else {
            res.json({ message: 'User not found!' });
        }
    }).catch(err => {
        res.json({ message: "An error occured" + err });
    });
});

//fetch restaurant
router.get('/restaurants', (req, res) => {
    Restaurant.find((err, restaurant) => {
        if (err) {
            res.json({ error: "message" + err });
        } else {
            res.json(restaurant);
        }
    });
});


//Define http ports
const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ` + port));