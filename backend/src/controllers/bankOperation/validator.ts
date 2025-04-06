import Joi from "joi";

// Validator for adding a new bank operation
export const addOperationValidator = Joi.object({
  accountNumber: Joi.string().min(1).required(),
  type: Joi.string().valid('withdrawal', 'deposit', 'loan').required(), 
  amount: Joi.number().min(0).required(), 
  date: Joi.date().iso().required(), 
  interest: Joi.number().min(0), 
  payments: Joi.number().min(1), 
});