const Joi = require('@hapi/joi');
const Model = require('./model');

class AuthModel extends Model {
  table = 'users';

  authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}

module.exports = new AuthModel();
