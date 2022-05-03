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

// const User = require('./models/user')(sequelize)
