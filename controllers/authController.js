const AuthService = require('../services/authService');
const TokenService = require('../services/tokenService');

const Response = require('../models/response');

const authController = {
  login: async (req, res, next) => {
    try {
      const result = await AuthService.login(req.body);

      return res.status(200).json(Response.success(result));
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const result = await AuthService.register(req.body);

      return res.status(200).json(Response.success(result));
    } catch (error) {
      next(error);
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      // console.log(req.query);
      const result = await TokenService.verifyEmail(req.query.token);
      return res.status(200).json(Response.success(true));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = authController;
