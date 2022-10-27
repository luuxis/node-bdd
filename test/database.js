const { DataTypes, dataBase } = require('../index.js');

async function getDatabase(tableName, tableConfig) {
    let { database, table } = await dataBase.intilize({
        database: 'CraftLaunch',
        fileType: 'db',
        tableName: tableName,
        path: './database',
        tableConfig: tableConfig,
        log: false
    });
    return {
        database: database,
        table: table
    }
}

async function dataBaseToken() {
    let { table } = await getDatabase('tokens', {
        userID: DataTypes.CHAR(34),
        // ip: DataTypes.CHAR(255),
        refreshToken: DataTypes.CHAR(255),
        createdAt: DataTypes.NUMBER,
        expireAt: DataTypes.NUMBER
    });
    return { table, dataBase };
}

module.exports = {
    dataBaseToken: dataBaseToken,
    dataBase: dataBase,
    DataTypes: DataTypes
}