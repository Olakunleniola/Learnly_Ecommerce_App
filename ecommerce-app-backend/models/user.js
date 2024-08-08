const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Product, { foreignKey: 'createdBy' });
        }
    }

    User.init(
        {
          username: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          email: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
          },
          password: {
              type: DataTypes.STRING,
              allowNull: false,
          },
        },
        {
          sequelize,
          modelName: 'User',
          tableName: 'Users', // Explicitly set table name
          schema: 'public', // Explicitly set schema name
          hooks: {
              beforeCreate: async (user) => {
                  const salt = await bcrypt.genSalt(20);
                  user.password = await bcrypt.hash(user.password, salt);
              },
              beforeUpdate: async (user) => {
                  if (user.changed('password')) {
                      const salt = await bcrypt.genSalt(20);
                      user.password = await bcrypt.hash(user.password, salt);
                  }
              },
          },
        }
    );

    return User;
};