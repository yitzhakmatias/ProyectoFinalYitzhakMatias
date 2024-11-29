const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            // Define association: One User has many Tasks
            User.hasMany(models.Task, { foreignKey: 'userId' });
        }
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'active',
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
};
