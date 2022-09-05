const { Sequelize, DataTypes } = require('sequelize');

class index {
    async intilize(config) {
        let path = config.path;
        if (path) path = (`${path}/${config.database}.${config.fileType}`).replace('\\', '/')
        else path = (`${__dirname}/../database/${config.database}.${config.fileType}`).replace('\\', '/')
        
        let sequelize = new Sequelize({
            dialect: 'sqlite',
            host: path,
            logging: config.log
        });
        let table = sequelize.define(config.tableName, config.tableConfig);
        await sequelize.sync()
        return { sequelize, table };
    }

    async createData(table, data) {
        return await table.create(data);
    }

    async getAllData(table) {
        return (await table.findAll()).map(item => item.toJSON());
    }

    async getDataById(table, id) {
        return (await table.findOne({ where: { id } })).toJSON();
    }

    async updateData(table, id, data) {
        return await table.update(data, { where: { id } });
    }

    async deleteData(table, id) {
        let dataOriginal = await table.findOne({ where: { id } });
        return dataOriginal.destroy();
    }
}

module.exports = {
    dataBase: new index,
    DataTypes: DataTypes
}