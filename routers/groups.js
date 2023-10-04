const express = require('express')
const router = express.Router()
const groupController = require('../controllers/groupController');

/**
 * @description get all groups
 * @endpoint GET api/groups
 */
router.get('/', groupController.getAll);

/**
 * @description get user by id
 * @param {id} [user id]
 * @endpoint GET api/groups/:id
 */
router.get('/:id', groupController.getById);


/**
 * @description create user
 * @param {
 *  name: string|required,
 *  email: string|required|email,
 *  contact: string|required,
 *  license: string|required,
 *  area: string|required,
 * } [user object]
 * @endpoint POST api/groups
 */
router.post('/', groupController.create);


/**
 * @description update user
 * @param {
 *  name: string|required,
 *  email: string|required|email,
 *  contact: string|required,
 *  license: string|nullable,
 *  area: string|required,
 * } [user object]
 * @endpoint PUT api/groups/:id
 */
router.put('/:id', groupController.update);


/**
 * @description delete user
 * @param {id} [user id]
 * @endpoint DELETE api/groups/:id
 */
router.delete('/:id', groupController.delete);

module.exports = router;
