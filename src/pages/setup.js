import React from 'react';
import { useNavigate } from 'react-router-dom';
// import library_db from "../db_connect/sequelize_index"

const electron = window.require('electron');
const { ipcRenderer } = electron;

function Setup() {
  console.log("setup")

  let history = useNavigate();
  const [libraryName, setLibraryName] = React.useState();

  const handleSubmit = e => {
      e.preventDefault();

      if (libraryName){
          ipcRenderer.invoke('setStoreValue', 'library_name', libraryName)
          .then(ipcRenderer.invoke('setStoreValue', 'library_setup', true))
          .then(history('/Login'));
      }else{
          console.log("empty library name");
          window.alert("Please choose a name with more than 0 characters.");
      }
  };

    const handleChange = e => {
      setLibraryName(e.target.value)
    };

    return (
        <div id="setup_block" className="fullycentered">
            <center><h1>Welcome!</h1></center>
            <form onSubmit={handleSubmit}>
                <center><label>Enter the name of your new library:</label></center><br/>
                <center className="input-label">The <input className="userInput" id="smaller-input" name="libName" type="text"
                    placeholder="Library Name..." onChange={handleChange} /> Library</center>
                <br />
                <center><input className="userSubmit" id="search-btn" type="submit" value="Next" /></center>
            </form>
        </div>
    );
}

export default Setup;
