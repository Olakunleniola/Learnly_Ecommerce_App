const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const { handleError } = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use(handleError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});