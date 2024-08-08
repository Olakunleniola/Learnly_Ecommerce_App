const express = require('express');
const { login } = require('../controllers/authController');
const {loginValidation} = require('../validators/authValidator');
const { handleValidationErrors } = require('../middlewares/errorMiddleware');

const router = express.Router();

router.post('/login', loginValidation, handleValidationErrors, login);

module.exports = router;
