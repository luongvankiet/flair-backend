const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

/**
 * @description login
 * @body {
 *  email: string|required,
 *  password: string|required,
 * }
 * @endpoint POST api/auth/login
 */
router.post('/login', authController.login);

/**
 * @description register
 * @body {
 *  firstName: string|required,
 *  lastName: string|required,
 *  mobileNo: string|nullable,
 *  phoneNo: string|required,
 *  email: string|required|email,
 *  password: string|required,
 *  role: string|required,
 *  groupId: number|nullable,
 * } [user object]
 * @endpoint POST api/auth/register
 */
router.post('/register', authController.register);

router.get('/verify-email', authController.verifyEmail)

module.exports = router;
