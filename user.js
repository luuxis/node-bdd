const { Model, DataTypes } = require('sequelize');
const dataBase = require('./database.js');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    }
}, {
    sequelize: dataBase,
    modelName: 'user'
})

module.exports = User;
