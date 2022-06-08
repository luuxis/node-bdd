const { Sequelize, DataTypes } = require('sequelize');

class createDataBase {
    async createDataBase(config) {
        let sequelize = new Sequelize('database', 'username', 'password', {
            dialect: 'sqlite',
            host: (`${__dirname}/../database/${config.database}.${config.fileType}`).replace('\\', '/'),
        });
        return sequelize;
    }

    async sync(sequelize) {
        return await sequelize.sync();
    }
}

class table {
    init(sequelize, config) {
        return sequelize.define(config.tableName, config.tableConfig)
    }
}

module.exports = {
    dataBase: new createDataBase,
    table: new table,
    DataTypes: DataTypes
}