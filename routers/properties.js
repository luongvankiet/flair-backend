const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/propertyController');


router.get('/', propertyController.getAll);

router.get('/:id', propertyController.getById);

router.post('/', propertyController.create);

router.put('/:id', propertyController.update);

router.delete('/:id', propertyController.delete);

module.exports = router;
