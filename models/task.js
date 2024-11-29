const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Task extends Model {
        static associate(models) {
            // Define association: Task belongs to one User
            Task.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }

    Task.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            done: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Task',
        }
    );

    return Task;
};
