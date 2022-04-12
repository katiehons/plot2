const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/library.db',
  define: {
    timestamps: false
  }
});

async function catch_err(){
  try {
    await sequelize.authenticate();
    console.log('sequelize Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the sequelize database:', error);
  }
}

catch_err();

const User = sequelize.define('Users', {
  // Model attributes are defined here
  username: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
});

async function get_users()
{
  try{
  const users = await User.findAll();
  console.log(users.every(user => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
  } catch (error) {
  console.error('Users table err:', error);
  }
}

get_users();


module.exports =
{
  User
}
