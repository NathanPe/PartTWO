const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userDB2');
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};