//Schema
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, require: true, uppercase: true },
    code: { type: String, require: true },
    mark: { type: Number, min: 0, max: 100 }
});


const studentSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    matrix: { type: String, uppercase: true },
    cgpa: { type: Number, min: 0, max: 4 },
    courses: [courseSchema]
});

module.exports = mongoose.model('Student', studentSchema);