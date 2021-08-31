const express = require('express');
const app = express();
const mongoose = require('mongoose');
const books = require('../Bookstore/books');
const User = require('./User');
const port = 8081;


//add the modules for using JSON Web Tokens
//const auth = require('./auth')();
//const jwt = require('jsonwebtoken');
//const config = require('./config');

//MongoDB connection
mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.3dagi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', router);

//add new document
router.post('/register', (req, res) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
    });

    //method save by mongoose to store newRestaurant model data in db
    newUser.save((err) => {
        if (err) {
            res.json({ error: 'message' + err });
        } else {
            res.json({ message: 'User succesfully created!' });
        }
        
    });
});

//update subdocuments by id - Reviews
router.put('/books/:id', (req, res) => {
    const id = req.params.id; //document id
    let descriptions = req.body; //data from json

    Books.findOneAndUpdate(
      id,
      { "$set": descriptions },
      (err, books) => {
        if (err) {
          res.json({ error: "message" + err });
        } else {
          res.json({ message: "Books succesfully updated!" });
        }
      }
    );
});

//Filter document by id
router.get("/users/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, books) => {
      if (err) {
        res.json({ error: "Getting error!" + err });
      } else {
        res.json({
          message: "Fetching books info for id: " + id,
          data: books,
        });
      }
    });
  });


//Fetch all documents
router.get('/users', function(req, res) {
    Books.find()
      .then(function (users) {
          res.send(users);
      })
      .catch({data: users});
  });

app.listen(port, () => console.log(`Example app listening on port `+port));