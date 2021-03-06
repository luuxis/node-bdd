const { DataTypes, dataBase, table } = require('./utils/database');

class index {
    async intilize(config) {
        let database = dataBase.createDataBase(config);
        dataBase.sync(database);
        return {
            database: database,
            table: await table.init(database, config)
        }
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