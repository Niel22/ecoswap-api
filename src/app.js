require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const cors = require('cors');
const corsOptions = require('./utils/corsOptions');
const { logger } = require('./utils/logEvents');
const { notFound, errorHandler } = require('./utils/errorHandler');
const path = require('path');


app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));

// Route Handler
app.use(logger);
app.use('/api/', apiRoutes);
app.use(notFound);
app.use(errorHandler);


module.exports = app;