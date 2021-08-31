const express = require('express');
const app = express();
const mongoose = require('mongoose');
const books = require('./books');
const Books = require('./books');
const port = 8080;

//MongoDB connection
mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.3dagi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', router);

//add new document
router.post('/books', (req, res) => {
    let newBooks = new Books({
        title: req.body.title,
        descriptions: req.body.descriptions,
        author: req.body.author,
        isbn: req.body.isbn,
        price: req.body.price,
        format: req.body.format
    });

    //method save by mongoose to store newRestaurant model data in db
    newBooks.save((err) => {
        if (err) {
            res.json({ error: 'message' + err });
        } else {
            res.json({ message: 'Books succesfully created!' });
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
router.get("/books/:id", (req, res) => {
    const id = req.params.id;
    Books.findById(id, (err, books) => {
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
router.get('/books', function(req, res) {
    Books.find()
      .then(function (books) {
          res.send(books);
      })
      .catch({data: books});
  });

app.listen(port, () => console.log(`Example app listening on port `+port));