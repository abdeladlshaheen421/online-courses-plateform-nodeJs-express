// 'use strict';
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { Sequelize,DataTypes } from "sequelize";
const basename = path.basename(__filename);
import config from "../config/config";
const db: any = {};

const sequelize = new Sequelize(
  config.development.database as string,
  config.development.username as string,
  config.development.password as string,
  config.development as Object
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
