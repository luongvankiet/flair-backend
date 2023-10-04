const Auth = require('../models/authModel');
const httpErrors = require('http-errors');
const bcrypt = require('bcrypt');
const token = require('../utils/token');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');
const { getEmailTemplate } = require('../utils/emailTemplate');
const nodemailer = require('nodemailer');

module.exports = {
  async login(loginCredentials) {
    try {
      const validatedRequests = await Auth.authSchema.validateAsync(loginCredentials);

      const user = await Auth.getOne({ email: validatedRequests.email });
      if (!user) {
        throw httpErrors.Unauthorized('Email or password is incorrect');
      }

      const isMatch = await bcrypt.compareSync(validatedRequests.password, user.password);

      if (!isMatch) {
        throw httpErrors.Unauthorized('Email or password is incorrect');
      }

      if (!user.verified_email_at) {
        this.sendVerifyEmail(user);
        throw httpErrors.Unauthorized('An email has sent to your email address. Please verify your account before login!');
      }

      const { access_token, payload } = await token.signAccessToken(user.id, user.email, user.accType);

      return { access_token, payload }
    } catch (error) {
      throw error;
    }
  },

  async register(userCredential) {
    try {
      const newUser = await userService.create(userCredential);

      if (!newUser) {
        return null;
      }

      this.sendVerifyEmail(user);
      throw httpErrors.Unauthorized('An email has sent to your email address. Please verify your account before login!');
    } catch (error) {
      throw error;
    }
  },

  async sendVerifyEmail(user) {
    try {
      const token = await tokenService.generateEmailVerificationToken(user.id);

      const subject = 'Verify Email';
      const url = `${process.env.VERIFY_EMAIL_DESTINATION}/auth/verify-email?token=${token.token}`;
      const html = getEmailTemplate(url);

      const transporter = nodemailer.createTransport({
        host: process.env.AUTH_HOST,
        service: process.env.AUTH_SERVICE,
        port: Number(process.env.AUTH_EMAIL_PORT),
        secure: Boolean(process.env.AUTH_SECURE),
        auth: {
          user: process.env.MOD_EMAIL,
          pass: process.env.MOD_PASS,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });

      transporter.sendMail({
        from: process.env.MOD_EMAIL,
        to: user.email,
        subject: subject,
        html: html,
      });
    } catch (error) {
      throw error;
    }
  },
}
