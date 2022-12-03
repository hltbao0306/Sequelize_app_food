const express = require('express');
const likeRoute = express.Router();
const {postLike, unlike, getLike_res,getLike_user} = require('../controllers/likeController');
const validation = require('../validation/index')
const validator = require('../middlewares/validator')

likeRoute.post('/like',validation.like.postLike,validator,postLike);
likeRoute.get('/getlikeres/:res_id',validation.like.getLikeRes,validator,getLike_res);
likeRoute.get('/getlikeuser/:user_id',validation.like.getLikeUser,validator,getLike_user)

module.exports = likeRoute;