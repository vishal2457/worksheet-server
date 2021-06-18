module.exports = (sequelize, DataType) => {
    const User_Master = sequelize.define(
      "User_Master",
      {
        ID: {
          type: DataType.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        Username: {
          type: DataType.STRING,
          allowNull: false,
        },
        Email: {
          type: DataType.STRING,
          allowNull: false,
        },
        Password: {
          type: DataType.STRING,
          allowNull: true,
        },
      
        IsAdmin: {
          type: DataType.BOOLEAN,
          defaultValue: 1,
        },
        
       
      },
      {
        freezeTableName: true,
        
      }
    );
    return User_Master;
  };
  