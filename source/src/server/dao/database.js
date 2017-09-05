import Sequelize from 'sequelize';

import fs from 'fs';

let database = {};

if (!fs.existsSync('db')) {
    fs.mkdirSync('db');
}

const sequelize = new Sequelize('db',null,null,{
    dialect:'sqlite',
    storage:'./db/db.sqlite'
});

const User = sequelize.define('user', {
    id: { type:Sequelize.BIGINT, allowNull: false, primaryKey:true, autoIncrement:true },
    username: { type:Sequelize.STRING },
    password: { type:Sequelize.STRING }
},{
    timestamps: false
});

sequelize.sync().then(() => {});

database.Sequelize = Sequelize;
database.sequelize = sequelize;
database.models = { 'user':User };

module.exports = database;