const sequelize = require('./connect');
require('./model/user');

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.log('Unable to connect to the database:', err);
});

sequelize.sync({
  force: true
}).then(() => {
  console.log('table has sync successfully.');
});