// Imports for external dependencies
const mongoose = require('mongoose');

// Dotenv config
require('dotenv').config();

const connect = () => {
    // Connecting to the Database
    mongoose.connect(`${process.env.DB_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        // eslint-disable-next-line no-console
        console.log('Connected to Database');
    });
};

module.exports = {
    connect
};