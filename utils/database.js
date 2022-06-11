const { Sequelize, DataTypes } = require('sequelize');

class createDataBase {
    createDataBase(config) {
        let path = config.path;
        if (path) path = (`${path}/${config.database}.${config.fileType}`).replace('\\', '/')
        else path = (`${__dirname}/../database/${config.database}.${config.fileType}`).replace('\\', '/')
        
        let sequelize = new Sequelize('database', 'username', 'password', {
            dialect: 'sqlite',
            host: path,
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