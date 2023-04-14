const { NodeBDD, DataType } = require('../build/Index')
const Nodedatabase = new NodeBDD()

async function main() {
    let database = await Nodedatabase.intilize({
        databaseName: 'news',
        fileType: 'db',
        tableName: 'news',
        path: './database',
        tableColumns: {
            titre: 'VARCHAR(255)',
            name: 'VARCHAR(255)',
            lastname: 'VARCHAR(255)',
            email: 'VARCHAR(255)'
        }
    })

    console.log(database)
}
main()