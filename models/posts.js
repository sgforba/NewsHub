const mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    source: { type: String, required: true },
    id: { type: String, required: true},
    date: { type: Date, required: true},
    image: {type: String}
  });

module.exports = mongoose.model('Post', PostSchema);