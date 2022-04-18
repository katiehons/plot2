import React from 'react';
import { useNavigate } from 'react-router-dom';
const electron = window.require('electron');
const { ipcRenderer } = electron;
const { Sequelize } = require('sequelize');


function Setup() {
  console.log("setup")
  // Database initialization
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/library.db',
    define: {
      timestamps: false
    }
  });

  const User = require('../db_connect/models/user')(sequelize)
  const Book = require('../db_connect/models/book')(sequelize)
  const Bookshelf = require('../db_connect/models/bookshelf')(sequelize)
  const Room = require('../db_connect/models/room')(sequelize)

  sequelize.sync();

  let history = useNavigate();
  const [state, setState] = React.useState({ libName: "" });

  const handleSubmit = e => {
      e.preventDefault();

      if (state.libName){
          ipcRenderer.invoke('setStoreValue', 'library_name', state.libName)
          .then(ipcRenderer.invoke('setStoreValue', 'library_setup', true))
          .then(history('/Login'));
      }else{
          console.log("empty library name");
          window.alert("Please choose a name with more than 0 characters.");
      }
  };

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        console.log("Library name: " + e.target.value);
    };

    return (
        <div className="setup">
            <center><h1>Welcome!</h1></center>
            <form onSubmit={handleSubmit}>
                <center><label for="libraryName">Enter the name of your new library:</label></center>
                <center><input className="userInput" id="smaller-input" name="libName" type="text"
                    placeholder="Library Name..." onChange={handleChange} /></center>
                <br />
                <center><input className="userSubmit" id="search-btn" type="submit" value="Next" /></center>
            </form>
        </div>
    );
    // return(
    //   <h1>setup</h1>
    // )
}

export default Setup;
