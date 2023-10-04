const Response = require('../models/response');
const GroupService = require('../services/groupService');

const groupController = {
  getAll: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || null;
      const perPage = parseInt(req.query.perPage) || null;

      if (page) {
        const { groups, total } = await GroupService.getPaginatedList(page, perPage);
        return res.status(200).json(Response.paginatedSuccess(groups, total, perPage, page));
      }

      const groups = await GroupService.getAll();
      return res.status(200).json(Response.success(groups))
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const group = await GroupService.getById(req.params.id);
      return res.status(200).json(Response.success(group));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const createdGroup = await GroupService.create(req.body);
      res.status(201).json(Response.success(createdGroup, 'Group created successfully'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const updatedGroup = await GroupService.update(req.params.id, req.body);
      res.status(201).json(Response.success(updatedGroup, 'Group updated successfully'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const deletedGroup = await GroupService.delete(req.params.id, req.body);
      res.status(201).json(Response.success(deletedGroup, 'Group deleted successfully'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = groupController;
