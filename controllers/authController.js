const AuthService = require('../services/authService');
const TokenService = require('../services/tokenService');
const UserService = require('../services/userService');
const User = require('../models/userModel');
const JWT = require('jsonwebtoken');
const httpErrors = require('http-errors');

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
      const newUser = await AuthService.register(req.body);

      return res.status(200).json(Response.success(newUser, 'An email has sent to your email address. Please verify your account before login!'));
    } catch (error) {
      next(error);
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      // console.log(req.query);
      const result = await TokenService.verifyEmail(req.query.token);
      return res.status(200).json(Response.success(result));
    } catch (error) {
      next(error);
    }
  },

  getCurrentUser: async (req, res, next) => {
    try {
      if (!req.headers || !req.headers['authorization']) {
        throw httpErrors.Unauthorized();
      }

      const authHeader = req.headers['authorization'];
      const bearerToken = authHeader.split(' ');
      const token = bearerToken[1];

      const payload = await JWT.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            console.log(err);
            return next(httpErrors.Unauthorized());
          }

          return payload;
        }
      );

      const user = await UserService.getById(payload.id);
      return res.status(200).json(Response.success(user));
    } catch (error) {
      next(error);
    }
  },

  verifyLicense: async (req, res, next) => {
    try {
      const { license, role } = req.body;

      if (!license) {
        throw httpErrors.BadRequest('License Number is required.');
      }

      const existingUser = await User.getOne({ license: license })

      if (existingUser) {
        throw httpErrors.BadRequest(`License Number ${license} is already exist!`);
      }

      const token = await AuthService.getAccessTokenFromNSWApi(role);

      const response = await AuthService.verifyLicense(role, token, license);

      return res.status(200).json(Response.success(response));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
}

module.exports = authController;
