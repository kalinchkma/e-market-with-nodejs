const Sequelize = require('sequelize');

const sequelize = new Sequelize('market','root','',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;