const db = require('../models');

const { Product } = db;

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  const { name, description, price, imageURL } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      imageURL,
      createdBy: req.user.id,
    });

    res.json(newProduct);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { name, description, price, imageURL } = req.body;

  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    if (product.createdBy !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.imageURL = imageURL;

    await product.save();

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    if (product.createdBy !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await product.destroy();

    res.json({ msg: 'Product removed' });
  } catch (err) {
    next(err);
  }
};
