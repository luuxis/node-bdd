const { dataBaseToken, dataBase, DataTypes } = require('./database.js');

async function test() {
    let { table, dataBase } = await dataBaseToken();


    let token = await dataBase.createColumn(table, 'ip', DataTypes.CHAR(255));

    console.log(token);
}

test();