var Joi = require("joi");
const createApiResponse = require('../../helper/createApiResponse')

function overallSchema(schema, req, res, next) {
  const { error } = schema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.json(createApiResponse(false, error, "Validation error", 404))
  } else {
    next()
  }
}

exports.createExpenseMiddleware = (req, res, next) => {
  const schema = Joi.object({
    expenseId: Joi.string().required(),
    expenseCategoryId: Joi.string().required(),
    expenseDetails: Joi.string().required(),
    expenseAmount: Joi.number().required(),
    expenseDate: Joi.date().required(),
  });
  overallSchema(schema, req, res, next)
};

exports.createExpCategoryMiddleware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required()
  })
  overallSchema(schema, req, res, next)
}

exports.createIncomeMiddleware = (req, res, next) => {
  const schema = Joi.object({
    incomeId: Joi.string().required(),
    incomeCategoryId: Joi.string().required(),
    incomeDetails: Joi.string().required(),
    incomeAmount: Joi.number().required(),
    incomeDate: Joi.date().required()
  })
  overallSchema(schema, req, res, next)
}

