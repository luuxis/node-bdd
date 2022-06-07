const { Sequelize, DataTypes, Model } = require('sequelize');

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



module.exports = {
    database: new createDataBase
}