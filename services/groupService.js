const Group = require('../models/groupModel');
const bcrypt = require('bcrypt');
const httpErrors = require('http-errors');
const util = require('../utils/pagination');

module.exports = {
  async getAll() {
    try {
      return util.emptyOrRows(await Group.getAll());
    } catch (error) {
      throw error;
    }
  },

  async getPaginatedList(page, perPage) {
    try {
      const groups = await Group.getPaginatedList(page, perPage);
      const total = await Group.getTotalCount();
      return { groups: util.emptyOrRows(groups), total };
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const group = await Group.getById(id);

      if (!group) {
        throw httpErrors.NotFound('Group not found');
      }

      return group;
    } catch (error) {
      throw error
    }
  },

  async create(body) {
    try {
      const validatedRequest = await Group.createSchema.validateAsync(body);

      const { insertId } = await Group.create(validatedRequest);

      return await Group.getById(insertId);
    } catch (error) {
      if (error.isJoi === true) {
        throw httpErrors.UnprocessableEntity(error.message);
      };
      throw error;
    }
  },

  async update(id, body) {
    try {
      const group = await Group.getById(id);

      if (!group) {
        throw httpErrors.NotFound('Group not found');
      }

      const validatedRequest = await Group.updateSchema.validateAsync(body);

      const updatedGroup = { ...group, ...validatedRequest }

      await Group.update(updatedGroup);

      return updatedGroup;
    } catch (error) {
      if (error.isJoi === true) {
        throw httpErrors.UnprocessableEntity(error.message);
      };
      throw error;
    }
  },

  async delete(id) {
    try {
      const group = await Group.getById(id);

      if (!group) {
        throw httpErrors.NotFound('Group not found');
      }

      await Group.delete(group)

      return group;
    } catch (error) {
      throw error;
    }
  }
}
