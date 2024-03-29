const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID, // de tipo alfa numerico
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 // para que se genere automaticamente un id
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    released:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating:{
      type: DataTypes.FLOAT,

    },
    platforms:{
      type: DataTypes.STRING,
      // allowNull: false,
    }, 
    image:{
      type: DataTypes.STRING,
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  {
    timestamps: false
  });
};
