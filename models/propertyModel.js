const Model = require("./model");
const Joi = require('@hapi/joi');

class PropertyModel extends Model {
  table = 'properties';

  
}

module.exports = new PropertyModel();
