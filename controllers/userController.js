const Response = require('../models/response');
const UserService = require('../services/userService');

const userController = {
  getAll: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || null;
      const perPage = parseInt(req.query.perPage) || null;

      if (page) {
        const { users, total } = await UserService.getPaginatedList(page, perPage);
        return res.status(200).json(Response.paginatedSuccess(users, total, perPage, page));
      }

      const users = await UserService.getAll();
      return res.status(200).json(Response.success(users))
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const user = await UserService.getById(req.params.id);
      return res.status(200).json(Response.success(user));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const createdUser = await UserService.create(req.body);
      res.status(201).json(Response.success(createdUser, 'User created successfully'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const updatedUser = await UserService.update(req.params.id, req.body);
      res.status(201).json(Response.success(updatedUser, 'User updated successfully'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const deletedUser = await UserService.delete(req.params.id, req.body);
      res.status(201).json(Response.success(deletedUser, 'User deleted successfully'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
