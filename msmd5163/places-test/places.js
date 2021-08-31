const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    user: { type: String, require: true },
    messages: String,
    rating: { type: Number, min: 0, max:100}
});

const placesSchema = new mongoose.Schema({
    name: String,
    country: String,
    description: String,
    tags: [String],
    comments: [commentsSchema]
});

module.exports = mongoose.model("Place", placesSchema);