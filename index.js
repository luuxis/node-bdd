const dataBase = require('./database.js');
const User = require('./user.js');

dataBase.sync().then(() => {
    console.log('Database is ready');
}).catch(err => {
    console.log(err);
});
User.create({
    username: 'admin',
    password: 'admin',
    email: 'azerrt'
}).then(user => {
    console.log(user.dataValues);
})