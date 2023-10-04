const Model = require("./model");
const Joi = require('@hapi/joi');

class TokenModel extends Model {
  table = 'tokens';
}

module.exports = new TokenModel();
