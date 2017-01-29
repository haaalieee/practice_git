var mongoose = require('mongoose');
    Schema = mongoose.Schema;
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String},
    password: {type: String},
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);