const joi = require('joi');

const schema = joi.object({
    id: joi.number().integer().min(1).max(50).required(),
    name: joi.string().min(1).max(500).required(),
    email: joi.string().min(1).max(18).required(),
    password: joi.string().min(5).max(150).required(),
    mobile: joi.string().min(1).max(10).required(),
    photo: joi.string().required(),
    aadhar: joi.string().min(1).max(16).required(),
    doj: joi.date().required(),
    qualification: joi.string().min(1).max(120).required(),
    dob: joi.date().required(),
    address: joi.string().min(5).max(200).required(),
    state: joi.string().min(3).max(30).required(),
    city: joi.string().min(2).max(50).required(),
    pin: joi.string().min(6).max(6).required(),
    status: joi.string().min(5).max(8).required()

})

const tbl_admin_user_validation = (req,res,next)=>{
    const value = schema.validate(req.body)
    if(value.error){
        res.send({error: value.error.details[0]})
    }
    else{
        next()
    }
}

module.exports = tbl_admin_user_validation;