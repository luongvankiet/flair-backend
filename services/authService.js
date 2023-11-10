const Auth = require('../models/authModel');
const httpErrors = require('http-errors');
const bcrypt = require('bcrypt');
const token = require('../utils/token');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');
const { getEmailTemplate } = require('../utils/emailTemplate');
const nodemailer = require('nodemailer');
const axios = require('axios');

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

      return { access_token, user: payload }
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

      this.sendVerifyEmail(newUser);
      return newUser;
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

  async getAccessTokenFromNSWApi(role) {
    try {
      const token = ['agent', 'agency', 'assistant agent'].includes(role)
        ? process.env.NSW_API_PROPERTY_AUTHORIZATION_HEADER
        : process.env.NSW_API_CONTRACTOR_AUTHORIZATION_HEADER

      const response = await axios.get('https://api.onegov.nsw.gov.au/oauth/client_credential/accesstoken', {
        params: { grant_type: 'client_credentials' },
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      return response.data.access_token;
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  async verifyLicense(role, token, license) {
    try {
      const isAgency = ['agent', 'agency', 'assistant agent'].includes(role);
      if (!token) {
        throw httpErrors.UnprocessableEntity('Invalid License Number');
      }

      const url = isAgency
        ? 'https://api.onegov.nsw.gov.au/propertyregister/v1/verify'
        : 'https://api.onegov.nsw.gov.au/tradesregister/v1/verify';

      const apiKey = isAgency
        ? process.env.NSW_API_PROPERTY_KEY
        : process.env.NSW_API_CONTRACTOR_KEY;

      const response = await axios.get(url, {
        params: { licenceNumber: license },
        headers: {
          'Authorization': `Bearer ${token}`,
          'apikey': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const results = response.data;

      if (!results.length) {
        throw httpErrors.NotFound('License not found.');
      }

      let licenceType = '';

      switch (role) {
        case 'agent':
          licenceType = 'Property - Individual'
          break;

        case 'assistant agent':
          licenceType = 'Property - Certificate'
          break;

        default:
          licenceType = 'Property - Corporation'
          break;
      }

      if (isAgency) {
        if (licenceType != results[0].licenceType) {
          throw httpErrors.BadRequest('Licence type is not matching')
        }
      }

      const status = results[0].status;

      switch (status) {
        case 'Expired':
          throw httpErrors.UnprocessableEntity('Licence expired')
          break;

        case 'Current':
          return results

        default:
          throw httpErrors.UnprocessableEntity('Licence is not valid')
          break;
      }

    } catch (error) {
      throw (error);
    }
  }
}
