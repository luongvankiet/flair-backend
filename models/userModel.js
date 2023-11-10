const Model = require("./model");
const Joi = require('@hapi/joi');

class UserModel extends Model {
  table = 'users';
  hidden = ['password']

  createSchema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    mobile_no: Joi.string().allow(null, ''),
    phone_no: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    group_id: Joi.number().allow(null, ''),
    company: Joi.string().allow(null, ''),
    address_line_1: Joi.string().allow(null, ''),
    address_line_2: Joi.string().allow(null, ''),
    suburb: Joi.string().allow(null, ''),
    country: Joi.string().allow(null, ''),
    postcode: Joi.string().allow(null, ''),
    license: Joi.string().allow(null, ''),
    account_type: Joi.string().allow(null, ''),
  });

  updateSchema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    mobile_no: Joi.string().allow(null, ''),
    phone_no: Joi.string().required(),
    role: Joi.string().required(),
    password: Joi.string().optional(),
    email: Joi.string().email().required(),
    group_id: Joi.number().optional(),
    company: Joi.string().allow(null, ''),
    address_line_1: Joi.string().allow(null, ''),
    address_line_2: Joi.string().allow(null, ''),
    suburb: Joi.string().allow(null, ''),
    country: Joi.string().allow(null, ''),
    postcode: Joi.string().allow(null, ''),
    license: Joi.string().allow(null, ''),
    account_type: Joi.string().allow(null, ''),
  });
}

module.exports = new UserModel();
