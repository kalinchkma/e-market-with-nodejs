const Sequelize = require('sequelize');

const sequelize = require("../../utils/database");

const ContactInfo = sequelize.define('contactInfo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    phoneNo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: true
});

module.exports = ContactInfo;
