const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: { type: String, require: true },
    rating: { type: Number, min: 0, max: 5 },
    review: String
});

const foodSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: String,
    price: Number,
    imageUrl: String,
});

const restaurantSchema = new mongoose.Schema({
    types: [String],
    name: { type: String, require: true },
    address: String,
    email: String,
    phone: String,
    description: String,
    opening_time: String,
    latitude: Number,
    longitude: Number,
    reviews: [reviewSchema],
    menus: [foodSchema]
});

module.exports = mongoose.model('Restaurant',restaurantSchema);