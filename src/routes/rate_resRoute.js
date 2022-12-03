const express = require('express');
const rate_resRoute = express.Router();
const { postRate_res, getRate_res, getRate_user } = require('../controllers/rate_resController');
const validation = require('../validation/index')
const validator = require('../middlewares/validator')

rate_resRoute.post('/postrate',validation.rate.postRate,validator,postRate_res)
rate_resRoute.get('/getrateres/:res_id',validation.rate.getRateRes,validator,getRate_res);
rate_resRoute.get('/getrateuser/:user_id',validation.rate.getRateUser,validator,getRate_user);

module.exports = rate_resRoute;