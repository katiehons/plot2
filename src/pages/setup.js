import React from 'react';
import { useNavigate } from 'react-router-dom';
// import sendAsync from '../db_connect/renderer';
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



    //
    // const bookTableCreate = "CREATE TABLE IF NOT EXISTS books( isbn INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL, bookshelf_id, cover BLOB, FOREIGN KEY(bookshelf_id) REFERENCES bookshelves(bookshelf_id))";
    // // const bookTableCreate = "CREATE TABLE IF NOT EXISTS books( isbn TEXT NOT NULL PRIMARY KEY, title TEXT, author TEXT, author_sort TEXT, series TEXT, series_sequence REAL, cover BLOB, cover_color TEXT, spine_color TEXT, media_type TEXT, FOREIGN KEY(bookshelf_id) REFERENCES bookshelves(bookshelf_id))";
    // // const locationTableCreate = "CREATE TABLE IF NOT EXISTS locations( location_id TEXT NOT NULL PRIMARY KEY, room TEXT, bookshelf TEXT, shelf INTEGER )";
    // const userTableCreate = "CREATE TABLE IF NOT EXISTS \"users\" (\"username\" TEXT PRIMARY KEY, \"reading history\" TEXT)";
    // const roomsTableCreate = "CREATE TABLE IF NOT EXISTS rooms( room_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, room_name TEXT UNIQUE )";
    // const bookshelvesTableCreate = "CREATE TABLE IF NOT EXISTS bookshelves( bookshelf_id INTEGER PRIMARY KEY AUTOINCREMENT, bookshelf_name TEXT UNIQUE, number_shelves INTEGER )";
    // const roomsBooksTableCreate = "CREATE TABLE IF NOT EXISTS rooms_bookshelves( room_id INTEGER, bookshelf_id INTEGER UNIQUE, PRIMARY KEY ( room_id, bookshelf_id ) )";
    //
    //
    // sendAsync(bookTableCreate).then((result) => console.log(result));
    // // sendAsync(locationTableCreate).then((result) => console.log(result));
    // sendAsync(userTableCreate).then((result) => console.log(result));
    // sendAsync(roomsTableCreate).then((result) => console.log(result));
    // sendAsync(bookshelvesTableCreate).then((result) => console.log(result));
    // sendAsync(roomsBooksTableCreate).then((result) => console.log(result));


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
