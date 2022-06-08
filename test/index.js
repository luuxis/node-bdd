const { DataTypes, dataBase } = require('../index');
let config = {
    database: 'news',
    fileType: 'sqlite',
    tableName: 'news',
    tableConfig: {
        title: DataTypes.CHAR(200),
        content: DataTypes.TEXT,
        author: DataTypes.CHAR(30)
    }
}

async function main() {
    let { table } = await dataBase.intilize(config);
    // await dataBase.createData(table, {
    //     title: 'test',
    //     content: 'test',
    //     author: 'test'
    // });
    let test = await dataBase.getAllData(table, 1);
    console.log(test);
}

main();