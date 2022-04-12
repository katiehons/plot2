import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sendAsync from '../db_connect/renderer';

// import { Sequelize } from 'sequelize';
import User from '../db_connect/open_sequelize';
// const { User } = require( '../db_connect/sequelize');
const electron = window.require('electron');
const { ipcRenderer } = electron;
const electron_store = window.require('electron-store');
const { store } = electron_store;



async function get_users()
{
  // const users = await User.findAll();
  // console.log(users.every(user => user instanceof User)); // true
  // console.log("All users:", JSON.stringify(users, null, 2));
}

function Login() {
  // sequelize explorations
  // const users = await User.findAll();
  // console.log(users.every(user => user instanceof User)); // true
  // console.log("All users:", JSON.stringify(users, null, 2));
  get_users();
  /// fin sequelize explaorations

  let history = useNavigate();

  const setUser = (username) => {
    console.log("profil click! for user " + username);
    console.log('profile is ' + ipcRenderer.invoke('getStoreValue', 'current_user'));
    ipcRenderer.invoke('setStoreValue', 'current_user', username);
    console.log('now profile is ' + ipcRenderer.invoke('getStoreValue', 'current_user'));

    history("/Home");
    // library_state.set('current_user', 'Me');
  }

  function makeButton(user) {
    console.log('button for ' + user);
    return (
      <button className="profiles-button" onClick={() => setUser(user)}>{user}</button>
    )
  }

  function ProfileButtons({ profiles }) {
    console.log("making *all* the buttons");
    console.log(profiles);
    return (
      <span id='generated-profilesButtons'>{profiles.map((user) => makeButton(user))}</span>
    )
  }

  const [profiles, setProfiles] = useState([]);
  const [libName, setLibName] = useState([]);
  // TODO read in the actual library Name
  // TODO add generated list of profile buttons from stored user profiles'
  // console.log("config.json at " + app.getPath('userData'));
  // console.log(app.getPath('userData'));
  //

  function LibraryHeader({ name }) {
    console.log("getting library name");
    console.log(name);
    return (
      <h1 id='library_name'>The {name} Library</h1>
    )
  }

  if (libName.length === 0){
    ipcRenderer.invoke('getStoreValue', 'library_name').then((result) => {
      // library_name = result;
      console.log("library name: " + result);
      setLibName(result);
    })
  }

  if (profiles.length === 0) {
    console.log("generating login pg…");
    var sql_get_users = "SELECT username FROM users";
    sendAsync(sql_get_users).then((result) => {
      console.log("our users:")
      console.log(result);

      // var current_profiles = document.getElementById('profileButtons');

      var users = [];
      for (var i = 0; i < result.length; i++) {
        users.push(result[i].username);
      }
      console.log(users);

      if (users.length > 0)
      {
        setProfiles(users);
      }
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
  // return(
  //   <h1>profiles</h1>
  // )
}

    export default Login
