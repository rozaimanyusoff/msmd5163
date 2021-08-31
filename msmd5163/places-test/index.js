const express = require('express');
const mongoose = require('mongoose');
const Place = require('./places');


mongoose
  .connect(
    "mongodb+srv://apiuser:abcd1234@cluster0.3dagi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();
    const router = express.Router();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api", router);

    app.get("/", (req, res) => {
      res.json({ message: "Places API." });
    });

    //add new document
    router.post("/places", (req, res) => {
      let newPlace = new Place({
        name: req.body.name,
        country: req.body.country,
        description: req.body.description,
        tags: req.body.tags,
      });

      //method save by mongoose to store newRestaurant model data in db
      newPlace.save((err) => {
        if (err) {
          res.json({ error: "message" + err });
        } else {
          res.json({ message: "Place succesfully registered!" });
        }
      });
    });

    //Add reviews into target document
    router.post("/places/:id/comments", (req, res) => {
      const id = req.params.id;
      let comments = req.body;
      Place.findByIdAndUpdate(id, { $push: comments }, (err, places) => {
        if (err) res.json({ error: "message" + err });
        res.json({ message: "Comments succesfully added!" });
      });
    });

    //Fetch all documents
    router.get("/places", function (req, res, next) {
      Place.find()
        .then(function (places) {
          res.send(places);
        })
        .catch(next);
    });

    const port = process.env.PORT || 8086;
    app.listen(port, () => {
      console.log(`Server is running on port ` + port);
    });
  });



