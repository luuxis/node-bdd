const { NodeBDD, DataType } = require('node-bdd')

async function main() {
    const Nodedatabase = new NodeBDD()
    let database = await Nodedatabase.intilize({
        databaseName: 'test',
        fileType: 'db',
        tableName: 'news',
        path: './database',
        tableColumns: {
            titre: DataType.TEXT.VARCHAR(255),
            name: DataType.TEXT.VARCHAR(255),
            lastname: DataType.TEXT.VARCHAR(255),
            email: DataType.TEXT.VARCHAR(255)
        }
    })

    let data = {
        titre: 'Luuxis',
        name: 'André',
        lastname: 'Gallo',
        email: 'contact@luuxis.fr'
    }

    // await Nodedatabase.createData(database, data)
    // await Nodedatabase.updateData(database, data, 1)
    await Nodedatabase.getDataById(database, 3)
}
main()