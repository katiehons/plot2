import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import library_db from "../db_connect/sequelize_index"
import { LibraryHeader, ProfileButtons } from "../library_components"

const User = library_db.user;
const electron = window.require('electron');

const { ipcRenderer } = electron;

function Login() {
  let history = useNavigate();

  // users and library name
  const [profiles, setProfiles] = useState([]);
  const [libName, setLibName] = useState();
  const [firstLoad, setFirstLoad] = useState( true )

  // Set user on profile button click
  const setCurrentUser = (username) => {
    ipcRenderer.invoke('setStoreValue', 'current_user', username);
    history("/Home");
  }

  // get library from electron store (settings and config info)
  if (firstLoad){
    setFirstLoad( false );
    ipcRenderer.invoke('getStoreValue', 'library_name').then((result) => {
      setLibName(result);
    })
    User.findAll({raw: true}).then((users) => {
      setProfiles( users );
    });
  }

  return (
    <div className='login'>
      <LibraryHeader name={libName}/>
      <h2>Select a profile to view books</h2>
      <div id='profileButtons'>
        <ProfileButtons profiles={profiles} onProfileClick={setCurrentUser}/>
        <Link to={'/AddProfile'} id='newProfileLink'>
          <button id="newProfileButton" className="profiles-button">Add Profile</button>
        </Link>
        <button id="guestProfileButton" className="profiles-button" onClick={() => setCurrentUser("Guest")}>Guest</button>
      </div>
      <div id="icon-attribution">
      <span id="links-and-sep"> App icons created by </span>
      <a href="https://www.flaticon.com/free-icons/bookshelf" title="bookshelf icons" >Daniel Ceha</a>
      <span id="links-and-sep"> and </span>
      <a href="https://www.flaticon.com/free-icons/book" title="book icons"> bqlqn</a>
      </div>
    </div>
  )
}

    export default Login
