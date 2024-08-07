const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Product extends Model {
        static associate(models) {
        Product.belongsTo(models.User, { foreignKey: 'createdBy' });
        }
    }

    Product.init(
        {
            name: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            description: {
            type: DataTypes.TEXT,
            allowNull: false,
            },
            price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            },
            imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            },
        }, 
        
        {
            sequelize,
            modelName: 'Product',
        }
    );

    return Product;
};

