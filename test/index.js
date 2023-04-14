const { NodeBDD, DataType } = require('node-bdd')

async function main() {
    const Nodedatabase = new NodeBDD()
    let database = await Nodedatabase.intilize({
        databaseName: 'test',
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

    let data = {
        titre: 'Luuxis',
        name: 'André',
        lastname: 'Gallo',
        email: 'contact@luuxis.fr'
    }

    await Nodedatabase.updateData(database, data, 1)
}
main()