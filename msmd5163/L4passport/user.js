const mongoose = require("mongoose");
const bcrypt = require("bcrypt-node");

const UserModel = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, minLength: 6 },
});

UserModel.pre("save", function (callback) {
    var user = this;
    if (!user.isModified("password")) {
        return callback();
    }
    //generate 5 random number to add to the original password for protection then only encrypt
    bcrypt.genSalt(5, function (err, salt) {
        if (err) {
            return callback(err);
        } else {
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return callback(err);
                } else {
                    user.password = hash;
                    callback();
                }
            });
        }
    });
});

UserModel.methods.verifyPassword = function (password, callback) {
    //it will check if the hash of "password" is the same with the one in db by comparing the password pass in parameter with the stored password (hash+salt) in db
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            throw callback(err);
        } else {
            callback(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', UserModel);