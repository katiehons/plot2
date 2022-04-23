import React from 'react';
import { useNavigate } from 'react-router-dom';
import library_db from "../db_connect/sequelize_index"

const electron = window.require('electron');
const { ipcRenderer } = electron;

function Setup() {
  console.log("setup")
  // Database initialization

  // const Book = library_db.book;
  // const Bookshelf = library_db.bookshelf;
  // const Room = library_db.room;
  // const User = library_db.user;
  //
  // const sequelize = library_db.sequelize;
  //
  // sequelize.sync();

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
}

export default Setup;
