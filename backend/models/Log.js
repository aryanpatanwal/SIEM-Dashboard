const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({

    event: String,
    severity: String,
    user: String,
    ip: String,
    timestamp: String

});

module.exports = mongoose.model('Log', LogSchema);