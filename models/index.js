const Sequelize = require("sequelize");
let mode = {
  development: "development",
  production: "production",
  test: "test",
};

let env = mode.development;
const config = require(__dirname + "/../config/config.json")[env];
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
//
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};
db.env = env;
db.Sequelize = Sequelize;
db.sequelize = sequelize;

let files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});

for (let file of files) {
  let parsedFileName = path.parse(file).name;
  let model = parsedFileName.charAt(0).toUpperCase() + parsedFileName.slice(1);
  db[model] = require(path.join(__dirname, file))(
    sequelize,
    Sequelize.DataTypes
  );
}

module.exports = db;
