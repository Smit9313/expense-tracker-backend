var Joi = require("joi");
const createApiResponse = require('../../helper/createApiResponse')

exports.createExpenseMiddleware = (req, res, next) => {
  const schema = Joi.object().keys({
    expenseCategoryId:Joi.string().required(),
    expenseDetails:Joi.string().required(),
    expenseAmount:Joi.number().required(),
    expenseDate:Joi.date().required(),
  });

  const {error} = schema.validate(req.body,{abortEarly: false})
  if(error){
    return res.json(createApiResponse(false,error, "Validation error",404))
  }else{
    next()
  }
};
