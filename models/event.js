
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: String,
    description: String,
    time: String,
    date: String,
    location: String
});

module.exports = mongoose.model('Event', EventSchema);
