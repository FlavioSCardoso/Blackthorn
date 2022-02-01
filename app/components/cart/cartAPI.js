const express = require('express');
const router = express.Router();
const controller = require('./cartController');

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.delete);
router.post('/:id/addproduct', controller.addProduct);

module.exports = router;
