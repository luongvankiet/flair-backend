const Model = require("./model");
const Joi = require('@hapi/joi');

class GroupModel extends Model {
  table = 'user_groups';

  createSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.string().optional().allow(null, ''),
    license: Joi.string().required(),
    area: Joi.string().required(),
    type: Joi.string().required(),
    parent_id: Joi.optional().allow(null, ''),
  });

  updateSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    contact: Joi.string().optional().allow(null, ''),
    license: Joi.string().required().allow(null, ''),
    area: Joi.string().required(),
    parent_id: Joi.optional().allow(null, ''),
    type: Joi.string().required(),
  });
}

module.exports = new GroupModel();
