const { database } = require('./utils/database');

let config = {
    database: 'test',
    fileType: 'db'
}

let sequelize = database.createDataBase(config);

sequelize.sync().then(() => {
    console.log('Database created');
});

