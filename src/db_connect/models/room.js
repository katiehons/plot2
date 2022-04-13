const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Room = sequelize.define("rooms", {
    room_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    room_name: {
      type: DataTypes.TEXT,
      unique: true
    }
  },
  {
    timestamps: false,
  });

  const Bookshelf = require('./bookshelf')(sequelize)
  // Room.hasMany( Bookshelf, {} );
  //todo: use my own names for rooms_bookshelves
  Room.belongsToMany( Bookshelf, { through: "rooms_bookshelves", foreignKey: "room_id", otherKey: "bookshelf_id" });
  return Room;
};

// classMethods: {
//             associate: function(models) {
//                 Cookoff.belongsToMany(models.Participant, {
//                     through: {
//                         model: models.CookoffParticipant
//                     },
//                     as: "Cookoffs",
//                     foreignKey: "CookoffID",
//                     otherKey: "ParticipantID"
//                 });
//             }
//         }
