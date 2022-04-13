const Joi=require('@hapi/joi')

//register validation
const registerValidation=(data)=>{
    const schema=Joi.object({
        firstName:Joi.string().min(2).required(),
        lastName:Joi.string().min(2).required(),
        userName:Joi.string().min(6).required(),
        password:Joi.string().min(6).required()
    })

    return schema.validate(data)

}

const loginValidation=(data)=>{
    const schema=Joi.object({
        userName:Joi.string().min(6).required(),
        password:Joi.string().min(6).required()
    })
    return schema.validate(data)
}
module.exports.registerValidation=registerValidation
module.exports.loginValidation=loginValidation

