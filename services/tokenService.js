const httpErrors = require('http-errors');
const tokenModel = require('../models/tokenModel');
const userModel = require('../models/userModel');
const JWT = require('../utils/token');

module.exports = {
  async getByToken(tokenValue) {
    try {
      const token = await tokenModel.getOne({ token: tokenValue });

      if (!token) {
        throw httpErrors.NotFound('Token not found');
      }

      switch (token.type) {
        case 'EMAIL_VERIFICATION':
          // jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET, (err, payload) => {
          //   if (err) {
          //     if (err.name === 'TokenExpiredError') {
          //       throw httpErrors.Unauthorized('Token not found');
          //     } else {
          //       throw httpErrors.UnprocessableEntity('Token is invalid');
          //     }
          //   }
          // })
          break;

        default:
          break;
      }

      return token;
    } catch (error) {
      throw error
    }
  },

  async generateEmailVerificationToken(userId) {
    try {
      const existingUser = await userModel.getById(userId);

      if (!existingUser) {
        throw httpErrors.NotFound('User not found');
      }

      const existingToken = await tokenModel.getOne({ user_id: existingUser.id })

      let token = await JWT.generateEmailVerificationToken(existingUser.id);

      if (existingToken && existingToken.type === 'EMAIL_VERIFICATION') {
        const verifiedToken = await JWT.verifyEmailToken(existingToken.token)
          .then(res => res)
          .catch(error => error);

        if (verifiedToken.valid) {
          return existingToken;
        }
      }

      const now = new Date();
      now.setMinutes(now.getMinutes() + 30)

      const body = {
        token: token,
        user_id: existingUser.id,
        type: 'EMAIL_VERIFICATION',
        expired_at: now,
      }

      const { insertId } = await tokenModel.create(body);

      return await tokenModel.getById(insertId);
    } catch (error) {
      throw error;
    }
  },

  async verifyEmail(token) {
    try {
      const existingToken = await tokenModel.getOne({ token: token });
      // let token = await JWT.generateEmailVerificationToken(existingUser.id);

      if (!existingToken) {
        throw httpErrors.NotFound('Token not found');
      }

      if (existingToken.type === 'EMAIL_VERIFICATION') {
        const verifiedToken = await JWT.verifyEmailToken(existingToken.token);

        if (!verifiedToken.valid) {
          throw httpErrors.Forbidden(verifiedToken.error);
        }
      }

      const existingUser = await userModel.getById(existingToken.user_id);

      if (!existingUser) {
        throw httpErrors.NotFound('User not found');
      }

      const now = new Date();

      const updatedUser = { ...existingUser, verified_email_at: now }

      await userModel.update(updatedUser);
      await tokenModel.delete(existingToken);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
