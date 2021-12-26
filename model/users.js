const Sequelize = require('sequelize');

const sequelize = require("../utils/database");

/**
 * Creating users model using sequelize
 */

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;