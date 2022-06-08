const { Sequelize, DataTypes } = require('sequelize');

class createDataBase {
    createDataBase(config) {
        this.sequelize = new Sequelize('database', 'username', 'password', {
            dialect: 'sqlite',
            host: (`${__dirname}/../database/${config.database}.${config.fileType}`).replace('\\', '/'),
        });
        return this.sequelize;
    }

    sync() {
        return this.sequelize.sync();
    }
}

class table {
    init(sequelize, config, tableConfig) {
        return sequelize.define(config.tableName, tableConfig);
    }
}

module.exports = {
    database: new createDataBase,
    table: new table,
    DataTypes,
}