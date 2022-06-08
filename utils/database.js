const { Sequelize, DataTypes } = require('sequelize');

class createDataBase {
    createDataBase(config) {
        let sequelize = new Sequelize('database', 'username', 'password', {
            dialect: 'sqlite',
            host: (`${__dirname}/../database/${config.database}.${config.fileType}`).replace('\\', '/'),
        });
        return sequelize;
    }

    sync(sequelize) {
        return  sequelize.sync();
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