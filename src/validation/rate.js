const sequelize = require('../models/index')
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { body, param, query } = require('express-validator')

let postRate = [
    body('user_id').exists().withMessage('Bạn chưa truyền user_id').isInt([{ min: 1 }]).withMessage('user_id phải là kiểu INT').custom(value => {
        return model.user.findOne({where : {user_id : value}}).then(user =>{
            if(!user){
                return Promise.reject( "user_id không tồn tại")
            }
        })
    }),
    body('res_id').exists().withMessage('Bạn chưa truyền res_id').isInt([{ min: 1 }]).withMessage('res_id phải là kiểu INT').custom(value => {
        return model.restaurant.findOne({where : {res_id : value}}).then(data =>{
            if(!data){
                return Promise.reject("res_id không tồn tại")
            }
        })
    }),
    body('amount').isInt([{ min: 1}]).withMessage('amount phải là số từ 1 đến 5').isIn([1,2,3,4,5]).withMessage('amount phải là số từ 1 đến 5')
]

let getRateRes = [
    param('res_id').exists().withMessage('Bạn chưa truyền res_id').isInt([{ min: 1 }]).withMessage('res_id phải là kiểu INT').custom(value => {
        return model.restaurant.findOne({where : {res_id : value}}).then(data =>{
            if(!data){
                return Promise.reject("res_id không tồn tại")
            }
        })
    })
]

let getRateUser = [
    param('user_id').exists().withMessage('Bạn chưa truyền user_id').isInt([{ min: 1 }]).withMessage('user_id phải là kiểu INT').custom(value => {
        return model.user.findOne({where : {user_id : value}}).then(user =>{
            console.log(!user)
            if(!user){
                return Promise.reject( "user_id không tồn tại")
            }
        })
    })
]

module.exports = {
    postRate,
    getRateRes,
    getRateUser
}