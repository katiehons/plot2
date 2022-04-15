import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Sequelize } from 'sequelize';


function AddProfile() {
  let history = useNavigate();

  const [newUsername, setNewUsername] = useState( "" );

  const handleSubmit = e => {
    e.preventDefault();
    if( newUsername )
    {
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

      User.create( { username: newUsername } ).then(() => {
        User.sync().then(() => {
          sequelize.close();
          history('/Login');
        });
      });
    }
    else {
      console.log("empty username string");
      window.alert("Username \"" + newUsername + "\" is invalid. Please try again.")
    }
  };
  const handleChange = e => {
    setNewUsername( e.target.value );
  };
    return (
        <div className='centered'>
          <h1>Add Profile</h1>
            <form onSubmit={handleSubmit}>
              <input className="userInput" id="text-input" name="newUsername" type="text"
                    placeholder="New Username" onChange={handleChange}/>
              <button id="submit-btn" className="edit-button"
                    type="submit">Save and return to profiles page</button>
            </form>

            <Link to={'/Login'} >
                <button id="abortButton" className="edit-button">Return without saving</button>
            </Link>
        </div>
    )
  // return(
  //   <h1>add profile</h1>
  // )
}

export default AddProfile;
