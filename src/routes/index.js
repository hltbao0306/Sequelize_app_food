const express = require('express');
const rootRoute = express.Router();

const likeRoute = require('./likeRoute')
const rate_resRoute = require('./rate_resRoute')
const orderRoute = require('./orderRoute')

rootRoute.use('/api',likeRoute);
rootRoute.use('/api',rate_resRoute);
rootRoute.use('/api', orderRoute);


module.exports = rootRoute;