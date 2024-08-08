const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middlewares/auth');
const { handleValidationErrors } = require('../middlewares/errorMiddleware');
const {productValidation} = require('../validators/productValidator')

const router = express.Router();

router.get('/', getProducts);
router.post('/', auth, productValidation, handleValidationErrors, addProduct);
router.put('/:id', auth, productValidation, handleValidationErrors, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
