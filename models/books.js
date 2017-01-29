var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    published: String,
    link: String,
    price: String,
    description: String,
    createDate: {type: Date, 'default': Date.now},
    updateDate: Date,
})

module.exports = mongoose.model('Book', bookSchema);