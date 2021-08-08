const { DataTypes,UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description :{
      type:DataTypes.TEXT,
      allowNull:false
    },
    released: {
      type:DataTypes.STRING,

    },
    rating:{
      type:DataTypes.DECIMAL,
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    background_image:{
      type:DataTypes.STRING,
    },
    createdDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }

  });
};
