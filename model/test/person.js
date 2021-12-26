const Sequelize = require('sequelize');

const sequelize = require('../../utils/database');


const Person = sequelize.define('person', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: true
});

module.exports = Person;