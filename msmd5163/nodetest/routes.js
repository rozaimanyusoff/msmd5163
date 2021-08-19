const express = require("express");
const restaurant = require("../L3restaurant-api/restaurant");
const Restaurant = require("./models/Restaurant"); // new
const router = express.Router();

// Fetch all documents
router.get('/restaurants', async (req, res) => {
    const restaurant = await Restaurant.find();
    res.json(restaurant);
});

// Fetch by id
router.get('/restaurants/:id', async (req, res) => {
    const id = await req.params.id;
    Restaurant.findById(id, (err, restaurant) => {
        if (err) {
            res.send({ error: "Error" + err });
        } else {
            res.send({message: "Fetching restaurant id: " + id, restaurant});
        }
    });
});



// Insert documents
router.post('/restaurants', async (req, res) => {
    const newRestaurant = new Restaurant({
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
    await newRestaurant.save();
    res.send({ message: 'Restaurant succesfully created!' });
});


//Update documents
router.post('/restaurants/:id/menus', (req, res) => {
    const id = req.params.id;
    Restaurant.findOneAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: "Failed to update id: " + id
            });
        } else res.send({ message: "id=${id} was updated successfully" });
    })
        .catch(err => {
        res.status(500).send({
            message: "Error updating documents"
        });
    });
});


//delete documents
router.delete('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id;
    Restaurant.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Failed to delete id=${id}!`
                });
            } else {
                res.send({
                    message: "Data was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete data with id=" + id
            });
        });
});

module.exports = router;