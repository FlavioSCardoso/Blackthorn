const express = require('express');
const router = express.Router();
const controller = require('./userController');

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
