const sequelize = require('../models/index')
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../ultis/reponse')
const {getDate} = require('../ultis/getDate')

// api like và unlike
const postLike = async (req,res)=>{

    try{
        let { user_id, res_id} = req.body;
        let newLike = {
            user_id, 
            res_id,
            date_like : getDate()
        }
        let checkLike = await model.like_res.findOne({where : {
            user_id,
            res_id
        }})
        if(!checkLike){
            let result = await model.like_res.create(newLike)
            successCode(res, result, "đã like"); 
            
        }
        else{
            model.like_res.destroy({
                where : {
                    res_id,
                    user_id
                }
            })
            failCode(res, " đã unlike");
        }
    }
    catch(err){
        errorCode(res,"lỗi backend")
    } 
}


// api lấy danh sách like theo nhà hàng
const getLike_res = async (req,res)=>{
    try{
        let res_id = req.params.res_id;
        let result = await model.like_res.findAll({
            where : {
                res_id 
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

//api lấy danh sách like theo user
const getLike_user = async (req,res)=>{
    try{
        let user_id = req.params.user_id;
        let result = await model.like_res.findAll({
            where : {
                user_id
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
    postLike, 
    getLike_res,
    getLike_user
}