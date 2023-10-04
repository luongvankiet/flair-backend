const User = require('../models/userModel');
const Group = require('../models/groupModel');
const bcrypt = require('bcrypt');
const httpErrors = require('http-errors');
const util = require('../utils/pagination');

module.exports = {
  async getAll() {
    try {
      return util.emptyOrRows(await User.getAll());
    } catch (error) {
      throw error;
    }
  },

  async getPaginatedList(page, perPage) {
    try {
      const users = await User.getPaginatedList(page, perPage);
      const total = await User.getTotalCount();
      return { users: util.emptyOrRows(users), total };
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const user = await User.getById(id);

      if (!user) {
        throw httpErrors.NotFound('User not found');
      }

      return user;
    } catch (error) {
      throw error
    }
  },

  async create(body) {
    try {
      const validatedRequest = await User.createSchema.validateAsync(body);

      const existingUser = await User.getOne({ email: validatedRequest.email });
      if (existingUser) {
        throw httpErrors.UnprocessableEntity(`${validatedRequest.email} is already exist!`);
      }

      validatedRequest.password = await bcrypt.hash(validatedRequest.password, 10);

      if (validatedRequest.group_id) {
        const group = await Group.getById(validatedRequest.group_id);

        if (!group) {
          throw httpErrors.NotFound('Group not found');
        }
      }

      const { insertId } = await User.create(validatedRequest);

      return await User.getById(insertId);
    } catch (error) {
      if (error.isJoi === true) {
        throw httpErrors.UnprocessableEntity(error.message);
      };
      throw error;
    }
  },

  async update(id, body) {
    try {
      const user = await User.getById(id);

      if (!user) {
        throw httpErrors.NotFound('User not found');
      }

      const validatedRequest = await User.updateSchema.validateAsync(body);

      const existingUser = await User.getOne({ email: validatedRequest.email });
      if (existingUser && existingUser.id !== user.id) {
        throw httpErrors.UnprocessableEntity(`${validatedRequest.email} is already exist!`);
      }

      if (body.password) {
        validatedRequest.password = await bcrypt.hash(body.password, 10);
      }

      if (validatedRequest.group_id) {
        const group = await Group.getById(validatedRequest.group_id);

        if (!group) {
          throw httpErrors.NotFound('Group not found');
        }
      }

      const updatedUser = { ...user, ...validatedRequest }

      await User.update(updatedUser);

      return updatedUser;
    } catch (error) {
      if (error.isJoi === true) {
        throw httpErrors.UnprocessableEntity(error.message);
      };
      throw error;
    }
  },

  async delete(id) {
    try {
      const user = await User.getById(id);

      if (!user) {
        throw httpErrors.NotFound('User not found');
      }

      await User.delete(user)

      return user;
    } catch (error) {
      throw error;
    }
  }
}
