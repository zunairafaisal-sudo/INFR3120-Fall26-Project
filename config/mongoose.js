const mongoose = require('mongoose');

module.exports = function() {

    const db = mongoose.connect(process.env.MONGODB_URI);

    require('../models/event');

    return db;
};
