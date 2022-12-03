const sequelize = require('../models/index')
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../ultis/reponse');
const { Op } = require("sequelize");

const addOrder = async (req, res)=>{
    try{
        let body = {...req.body}
        let arr_sub_id = body.arr_sub_id;
        
        let checkOrder = await model.order.findOne({where : {
            user_id : body.user_id,
            food_id : body.food_id
        }})
        if(!checkOrder){
            if(!body.arr_sub_id){
                let result = await model.order.create(body)
                successCode(res,result,"thêm order thành công")
            }
            else{
                body.arr_sub_id = body.arr_sub_id.toString()
                let result = await model.order.create(body)
                successCode(res,result,"thêm order thành công")
            }
        }
        else{
            failCode(res,"","Vui lòng bạn chọn food_id khác")
        }   
    }
    catch(err){
        errorCode(res,"lỗi backend")
    }
    
}

module.exports = {addOrder}