// Imports for external dependencies
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Imports for internal dependencies
const { connect } = require('./db/connect');

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
    connect();
});