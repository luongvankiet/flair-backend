const Model = require("./model");
const Joi = require('@hapi/joi');

class UserModel extends Model {
  table = 'users';
  hidden = ['password']

  createSchema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    mobile_no: Joi.string().optional(),
    phone_no: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    group_id: Joi.number().optional(),
    company: Joi.string().optional(),
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    suburb: Joi.string(),
    country: Joi.string(),
    postcode: Joi.string(),
  });

  updateSchema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    mobile_no: Joi.string().optional(),
    phone_no: Joi.string().required(),
    role: Joi.string().required(),
    password: Joi.string().optional(),
    email: Joi.string().email().required(),
    group_id: Joi.number().optional(),
    company: Joi.string().optional(),
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    suburb: Joi.string(),
    country: Joi.string(),
    postcode: Joi.string(),
  });
}

module.exports = new UserModel();
