const { NodeBDD, DataType } = require('node-bdd')

async function main() {
    const Nodedatabase = new NodeBDD()

    let tableColumns = {
        data: DataType.TEXT.TEXT,
        name: 'JSON'
    }
    let database = await Nodedatabase.intilize({
        databaseName: 'test',
        fileType: 'db',
        tableName: 'news',
        path: './database',
        tableColumns: tableColumns
    })

    // await Nodedatabase.createData(database, data)
    // await Nodedatabase.updateData(database, data, 1)
    // await Nodedatabase.getDataById(database, 3)
    // await Nodedatabase.createNewsColumns(database, {
    //     agea: DataType.TEXT.VARCHAR(255),
    //     azertya: DataType.TEXT.VARCHAR(255)
    // })
    // let columnsList = await Nodedatabase.getColumnsList(database)
    // console.log(columnsList)
    // await Nodedatabase.createColumnsIfNoteExist(database, tableColumns)
}
main()