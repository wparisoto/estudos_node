const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        require: true,
    },
    done: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = Task