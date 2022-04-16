import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Sequelize } from 'sequelize';
const electron = window.require('electron');
const { ipcRenderer } = electron;
const electron_store = window.require('electron-store');
const { store } = electron_store;

function Login() {
  // const [sequelize, setSequelize] = useState();
  // const [ User, setUser ] = useState();
  let history = useNavigate();

  // users and library name
  const [profiles, setProfiles] = useState([]);
  const [libName, setLibName] = useState([]);

// this mess is me trying to only make one sqlize connection per page load
// and do other things that we only want to do once per page load
  // useEffect(() => {
  //   console.log("first render! we hope")
  //   // Get usernames from database
  //   // should this execute every time?
  //   const sequelize = new Sequelize({
  //     dialect: 'sqlite',
  //     storage: './data/library.db',
  //     define: {
  //       timestamps: false
  //     }
  //   });
  //
  //   (async function(){
  //     console.log("this is where we would test the sqlize connection")
  //     try {
  //       console.log('trying to print that we might authenticate sqlize')
  //       // await sequelize.authenticate()
  //       // .then( () => {
  //     //     console.log('Profiles: useEffect, sequelize Connection has been established successfully.');
  //     //
  //     //     const User = require('../db_connect/models/user')(sequelize);
  //     //
  //     //     User.findAll({raw: true}).then((users) => {
  //     //       // console.log(users.every(user => user instanceof User)); // true
  //     //       console.log("(home)All users:", users);
  //     //       setProfiles( users );
  //     //     });
  //     //   });
  //     //
  //     } catch (error) {
  //       console.error('Unable to connect to the sequelize database:', error);
  //     }
  //   })();
  //   console.log("closing profiles sequelize");
  //   sequelize.close();
  //
  //   ipcRenderer.invoke('getStoreValue', 'library_name').then((result) => {
  //     // console.log("library name: " + result);
  //     setLibName(result);
  //   })
  // }, []);

  // Set user on profile button click
  const setCurrentUser = (username) => {
    // console.log("profil click! for user " + username);
    // console.log('profile is ' + ipcRenderer.invoke('getStoreValue', 'current_user'));
    ipcRenderer.invoke('setStoreValue', 'current_user', username);
    // console.log('now profile is ' + ipcRenderer.invoke('getStoreValue', 'current_user'));

    // close db connection for this page before home
    sequelize.close();
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
  // should this execute every time?......
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
      console.log('PROFILES: sequelize Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the sequelize database:', error);
    }
  })();

  const User = require('../db_connect/models/user')(sequelize)

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
