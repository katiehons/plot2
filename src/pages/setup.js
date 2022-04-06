import React from 'react';
import { useNavigate } from 'react-router-dom';
import sendAsync from '../db_connect/renderer';
const electron = window.require('electron');
const { ipcRenderer } = electron;

function Setup() {
    console.log("setup")
    // Database initialization
    const bookTableCreate = "CREATE TABLE IF NOT EXISTS books( isbn TEXT NOT NULL PRIMARY KEY, title TEXT, author TEXT, author_sort TEXT, series TEXT, series_sequence REAL, cover BLOB, cover_color TEXT, spine_color TEXT, media_type TEXT, location_id TEXT)";
    // const locationTableCreate = "CREATE TABLE IF NOT EXISTS locations( location_id TEXT NOT NULL PRIMARY KEY, room TEXT, bookshelf TEXT, shelf INTEGER )";
    const userTableCreate = "CREATE TABLE IF NOT EXISTS \"users\" (\"username\" TEXT NOT NULL UNIQUE, \"reading history\" TEXT, PRIMARY KEY(\"username\"))";
    const roomsTableCreate = "CREATE TABLE IF NOT EXISTS rooms( room_id INTEGER NOT NULL PRIMARY KEY, room_name TEXT UNIQUE )";
    const bookshelvesTableCreate = "CREATE TABLE IF NOT EXISTS bookshelves( bookshelf_id INTEGER NOT NULL PRIMARY KEY, bookshelf_name TEXT UNIQUE, number_shelves INTEGER )";
    const roomsBooksTableCreate = "CREATE TABLE IF NOT EXISTS rooms_books( room_id INTEGER, shelf_id INTEGER, PRIMARY KEY ( room_id, shelf_id ) )";


    sendAsync(bookTableCreate).then((result) => console.log(result));
    // sendAsync(locationTableCreate).then((result) => console.log(result));
    sendAsync(userTableCreate).then((result) => console.log(result));
    sendAsync(roomsTableCreate).then((result) => console.log(result));
    sendAsync(bookshelvesTableCreate).then((result) => console.log(result));
    sendAsync(roomsBooksTableCreate).then((result) => console.log(result));


    let history = useNavigate();
    const [state, setState] = React.useState({ libName: "" });

    const handleSubmit = e => {
        e.preventDefault();

        if (state.libName){
            ipcRenderer.invoke('setStoreValue', 'library_name', state.libName)
            .then(ipcRenderer.invoke('setStoreValue', 'library_setup', true))
            .then(history('/Login'));
        }else{
            console.log("empty username");
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
