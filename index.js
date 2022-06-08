const { database, table, DataTypes } = require('./utils/utils');

class index {
    intilize(config) {
        this.sequelize = database.createDataBase(config);
        this.sequelize.sync().then(() => {
            return {
                success: true,
                message: 'Database initialized successfully',
                sequelize: this.sequelize,
            }
        }).catch(err => {
            return {
                success: false,
                message: err
            }
        })
    }

    createTable(sequelize, config, tableConfig) {
        return table.init(sequelize, config, tableConfig);
    }

    async createData(table, data) {
        return await table.create(data);
    }

    async getAllDataBase(table) {
        return await table.findAll();
    }

    async getDataById(table, id) {
        return await table.findOne({ where: { id } });
    }

    async updateData(table, id, data) {
        let dataOriginal = await table.findOne({ where: { id } });
        dataOriginal = data
        return await dataOriginal.save();
    }

    async deleteData(table, id) {
        let dataOriginal = await table.findOne({ where: { id } });
        return await dataOriginal.destroy();
    }
}

module.exports = {
    index,
    DataTypes
}