import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import library_db from "../db_connect/sequelize_index"

const User = library_db.user;const electron = window.require('electron');

const { ipcRenderer } = electron;
const electron_store = window.require('electron-store');
const { store } = electron_store;

function Login() {
  let history = useNavigate();

  // users and library name
  const [profiles, setProfiles] = useState([]);
  const [libName, setLibName] = useState([]);

  // Set user on profile button click
  const setCurrentUser = (username) => {
    // console.log("profil click! for user " + username);
    // console.log('profile is ' + ipcRenderer.invoke('getStoreValue', 'current_user'));
    ipcRenderer.invoke('setStoreValue', 'current_user', username);
    // console.log('now profile is ' + ipcRenderer.invoke('getStoreValue', 'current_user'));

    history("/Home");
  }

  // get library from electron store (settings and config info)
  if (libName.length === 0){
    ipcRenderer.invoke('getStoreValue', 'library_name').then((result) => {
      // console.log("library name: " + result);
      setLibName(result);
    })
  }

  function LibraryHeader({ name }) {
    // console.log("getting library name");
    // console.log(name);
    return (
      <h1 id='library_name'>The {name} Library</h1>
    )
  }

  // Get usernames from database
  if (profiles.length === 0) {

    User.findAll({raw: true}).then((users) => {
      // console.log(users.every(user => user instanceof User)); // true
      console.log("(home)All users:", users);
      setProfiles( users );
    });
  }

  // username button
  function makeButton(user) {
    // console.log('button for ' + user);
    return (
      <button className="profiles-button" onClick={() => setCurrentUser(user.username)}>{user.username}</button>
    )
  }

  // all username buttons
  function ProfileButtons({ profiles }) {
    // console.log("making *all* the buttons");
    // console.log(profiles);
    return (
      <span id='generated-profilesButtons'>{profiles.map((user) => makeButton(user))}</span>
    )
  }

  return (
    <div className='login'>
      <LibraryHeader name={libName}/>
      <h2>Select a profile to view books</h2>
      <div id='profileButtons'>
        <ProfileButtons profiles={profiles} />
        <button className="profiles-button" onClick={() => setCurrentUser("Guest")}>Guest</button>
        <Link to={'/AddProfile'} id='newProfileLink'>
          <button id="newProfileButton" className="profiles-button">Add Profile</button>
        </Link>
      </div>
    </div>
  )
}

    export default Login
