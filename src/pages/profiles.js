import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Sequelize } from 'sequelize';
const electron = window.require('electron');
const { ipcRenderer } = electron;
const electron_store = window.require('electron-store');
const { store } = electron_store;

function Login() {
  let history = useNavigate();

  // users and library name
  const [profiles, setProfiles] = useState([]);
  const [libName, setLibName] = useState([]);

  // Set user on profile button click
  const setUser = (username) => {
    // console.log("profil click! for user " + username);
    // console.log('profile is ' + ipcRenderer.invoke('getStoreValue', 'current_user'));
    ipcRenderer.invoke('setStoreValue', 'current_user', username);
    // console.log('now profile is ' + ipcRenderer.invoke('getStoreValue', 'current_user'));

    // close db connection for this page before home
    sequelize.close();
    history("/Home");
  }

  // username button
  function makeButton(user) {
    // console.log('button for ' + user);
    return (
      <button className="profiles-button" onClick={() => setUser(user)}>{user}</button>
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
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/library.db',
    define: {
      timestamps: false
    }
  });

  (async function(){
    try {
      await sequelize.authenticate();
      console.log('sequelize Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the sequelize database:', error);
    }
  })();

  const User = require('../db_connect/models/user')(sequelize)

  if (profiles.length === 0) {
    User.findAll().then((users) => {
      console.log(users.every(user => user instanceof User)); // true
      console.log("(profiles)All users:", JSON.stringify(users, null, 2));
      console.log(users)
      var usernames = [];
      for (var i = 0; i < users.length; i++) {
        usernames.push(users[i].username);
      }
      console.log("sequelize got simplified users")
      console.log(usernames);
      setProfiles( usernames );
    });
  }

  return (
    <div className='login'>
      <LibraryHeader name={libName}/>
      <h2>Select a profile to view books</h2>
      <div id='profileButtons'>
        <ProfileButtons profiles={profiles} />
        <button className="profiles-button" onClick={() => setUser("Guest")}>Guest</button>
        <Link to={'/AddProfile'} id='newProfileLink'>
          <button id="newProfileButton" className="profiles-button">Add Profile</button>
        </Link>
      </div>
    </div>
  )
}

    export default Login
