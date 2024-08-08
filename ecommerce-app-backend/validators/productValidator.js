const { body } = require('express-validator');

exports.productValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('imageURL').isURL().withMessage('Please enter a valid URL for the image'),
];
