const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const { handleError } = require('./middlewares/errorMiddleware');
const db = require('./models/index');
const logger = require('morgan')

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
  
if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
}
  
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use(handleError);

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return db.sequelize.sync({ alter: true }); // Ensure schema is updated
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });