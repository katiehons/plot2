const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
  },
  {
    timestamps: false,
  });
  return User;
};


// module.exports = (sequelize) => {
//   const User = sequelize.define("User", {
//     firstName: {
//       type: Sequelize.STRING,
//     },
//     lastName: {
//       type: Sequelize.STRING,
//     },
//   },
//   {
//     timestamps: false,
//   });
//   return User;
// };

// const User = sequelize.define('Users', {
//   // Model attributes are defined here
//   username: {
//     type: DataTypes.TEXT,
//     primaryKey: true
//   },
// });
