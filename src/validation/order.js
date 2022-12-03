const sequelize = require('../models/index')
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { body, param, query } = require('express-validator')

let addOrder = [
    body('user_id').exists().withMessage('Bạn chưa truyền user_id').isInt([{ min: 1 }]).withMessage('user_id phải là kiểu INT').custom(value => {
        return model.user.findOne({where : {user_id : value}}).then(user =>{
            if(!user){
                console.log("test")
                return Promise.reject( "user không tồn tại")
            }
        })
    }),
    body('food_id').exists().withMessage('Bạn chưa truyền food_id').isInt([{ min: 1 }]).withMessage('food_id phải là kiểu INT').custom(value => {
        return model.food.findOne({where : {food_id : value}}).then(data =>{
            if(!data){
                return Promise.reject("Food không tồn tại")
            }
        })
    }),
    body('amount').optional().isInt([{ min: 1}]).withMessage('amount phải là kiểu INT'),
    body('code').optional().isString().withMessage('code phải là kiểu String'),
    body('arr_sub_id').optional(),
]

module.exports = {addOrder}

