const sequelize = require('../models/index')
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../ultis/reponse')
const {getDate} = require('../ultis/getDate')

const postRate_res = async (req,res)=>{
    try{
        let { user_id, res_id, amount} = req.body;
        let rateNew = {
            user_id,
            res_id,
            amount,
            date_rate : getDate()
            };
        let checkRate = await model.rate_res.findOne({
            where : {
                user_id,
                res_id
            }
        })
        if(!checkRate){
            let result = await model.rate_res.create(rateNew);
            successCode(res,result,"thêm đánh giá thành công")
        }
        else{
            let rateUpdate = {
                amount,
                date_rate : getDate()
            }
            let result = await model.rate_res.update(rateUpdate,{where : {
                user_id,
                res_id
            }} )
            successCode(res,result,"update thành công")
        }
    }
    catch(err){
        errorCode(res,"lỗi backend")
    } 
}

// api lấy danh sách đánh giá theo nhà hàng
const getRate_res = async (req,res)=>{
    try{
        let res_id = req.params.res_id;
        let result = await model.rate_res.findAll({
            where : {
                res_id : res_id
            },
            include : ["re","user"]
        })
        
        if(result.length == 0){
            successCode(res, result, "không tìm thấy dữ liệu");
        }
        else{
            successCode(res, result, "lấy dữ liệu thành công");
        }
    }
    catch(err){
        errorCode(res,"lỗi backend")
    }
}

//api lấy danh sách đánh giá theo user
const getRate_user = async (req,res)=>{
    try{
        let user_id = req.params.user_id;
        let result = await model.rate_res.findAll({
            where : {
                user_id : user_id
            },
            include : ["user","re"]
        })

        if(result.length == 0){
            successCode(res, result, "không tìm thấy dữ liệu");
        }
        else{
            successCode(res, result, "lấy dữ liệu thành công");
        }
    }
    catch(err){
        errorCode(res,"lỗi backend")
    }
}

module.exports = {
    postRate_res,
    getRate_res,
    getRate_user
}