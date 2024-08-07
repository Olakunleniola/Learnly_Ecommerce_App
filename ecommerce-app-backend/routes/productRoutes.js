const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.post('/', auth, addProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
