const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');

/**
 * @description get all users
 * @endpoint GET api/users
 */
router.get('/', userController.getAll);

/**
 * @description get user by id
 * @param {id} [user id]
 * @endpoint GET api/users/:id
 */
router.get('/:id', userController.getById);

/**
 * @description create user
 * @param {
 *  firstName: string|required,
 *  lastName: string|required,
 *  mobileNo: string|nullable,
 *  phoneNo: string|required,
 *  email: string|required|email,
 *  password: string|required,
 *  role: string|required,
 *  groupId: number|nullable,
 * } [user object]
 * @endpoint POST api/users
 */
router.post('/', userController.create);

/**
 * @description update user
 * @param {
 *  firstName: string|required,
 *  lastName: string|required,
 *  mobileNo: string|nullable,
 *  phoneNo: string|required,
 *  email: string|required|email,
 *  password: string|nullable,
 *  role: string|required,
 *  groupId: number|nullable,
 * } [user object]
 * @endpoint PUT api/users/:id
 */
router.put('/:id', userController.update);

/**
 * @description delete user
 * @param {id} [user id]
 * @endpoint DELETE api/users/:id
 */
router.delete('/:id', userController.delete);

module.exports = router;
