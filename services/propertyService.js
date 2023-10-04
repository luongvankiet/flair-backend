const Property = require('../models/propertyModel');
const httpErrors = require('http-errors');
const util = require('../utils/pagination');

module.exports = {
  async getAll() {
    try {
      return util.emptyOrRows(await Property.getAll());
    } catch (error) {
      throw error;
    }
  },

  async getPaginatedList(page, perPage) {
    try {
      const properties = await Property.getPaginatedList(page, perPage);
      const total = await Property.getTotalCount();
      return { properties: util.emptyOrRows(properties), total };
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const property = await Property.getById(id);

      if (!property) {
        throw httpErrors.NotFound('Property not found');
      }

      return property;
    } catch (error) {
      throw error
    }
  },

  async create(body) {
    try {
      const validatedRequest = await Property.createSchema.validateAsync(body);

      const { insertId } = await Property.create(validatedRequest);

      return await Property.getById(insertId);
    } catch (error) {
      if (error.isJoi === true) {
        throw httpErrors.UnprocessableEntity(error.message);
      };
      throw error;
    }
  },

  async update(id, body) {
    try {
      const property = await Property.getById(id);

      if (!property) {
        throw httpErrors.NotFound('Property not found');
      }

      const validatedRequest = await Property.updateSchema.validateAsync(body);

      const updatedProperty = { ...property, ...validatedRequest }

      await Property.update(updatedProperty);

      return updatedProperty;
    } catch (error) {
      if (error.isJoi === true) {
        throw httpErrors.UnprocessableEntity(error.message);
      };
      throw error;
    }
  },

  async delete(id) {
    try {
      const property = await Property.getById(id);

      if (!property) {
        throw httpErrors.NotFound('Property not found');
      }

      await Property.delete(property)

      return property;
    } catch (error) {
      throw error;
    }
  }
}
