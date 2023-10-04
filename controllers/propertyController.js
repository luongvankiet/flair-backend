const Response = require('../models/response');
const propertyService = require('../services/propertyService');

const propertyController = {
  getAll: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || null;
      const perPage = parseInt(req.query.perPage) || null;

      if (page) {
        const { properties, total } = await propertyService.getPaginatedList(page, perPage);
        return res.status(200).json(Response.paginatedSuccess(properties, total, perPage, page));
      }

      const properties = await propertyService.getAll();
      return res.status(200).json(Response.success(properties))
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const property = await propertyService.getById(req.params.id);
      return res.status(200).json(Response.success(property));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const createdProperty = await propertyService.create(req.body);
      res.status(201).json(Response.success(createdProperty, 'Property created successfully'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const updatedProperty = await propertyService.update(req.params.id, req.body);
      res.status(201).json(Response.success(updatedProperty, 'Property updated successfully'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const deletedProperty = await propertyService.delete(req.params.id, req.body);
      res.status(201).json(Response.success(deletedProperty, 'Property deleted successfully'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = propertyController;
