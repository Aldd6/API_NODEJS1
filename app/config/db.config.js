const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    operatorAliases: false,
    pool: {
        min: env.pool.min,
        max: env.pool.max,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//write here the models for the ORM
db.Books = require('../models/books.model.js')(sequelize,Sequelize);
db.Loans = require('../models/loans.model.js')(sequelize,Sequelize);

module.exports = db;