// Imports for external dependencies
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// Dotenv config
require('dotenv').config();

// Routes
const minionRoute = require('./routes/minions');

// Initialize express
const app = express();

// Port number
const port = process.env.PORT || 8000;

// Use express body parser
app.use(express.json());

// Use Morgan
app.use(morgan('common'));

// Use Helmet
app.use(helmet());

// Use CORS
app.use(cors({
    origin: process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:3000' : ''
}));

// Use Express Routes
app.use('/hearthstone-battlegrounds-simulator/api/', minionRoute);

// Use static content
app.use('/assets', express.static(path.join(__dirname, 'assets')));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('hearthstone-battlegrounds-simulator-client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'hearthstone-battlegrounds-simulator-client', 'build', 'index.html'));
    });
}

// Starting server
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started port on ${port}`);
});

// Connecting to the Database
mongoose.connect(`${process.env.DB_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    // eslint-disable-next-line no-console
    console.log('Connected to Database');
});