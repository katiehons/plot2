import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import library_db from "../db_connect/sequelize_index"

const User = library_db.user;

function AddProfile() {
  let history = useNavigate();

  const [newUsername, setNewUsername] = useState( "" );

  const handleSubmit = e => {
    e.preventDefault();
    if( newUsername )
    {
      User.create( { username: newUsername } ).then(() => {
        User.sync().then(() => {
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
              <button id="submit-btn"
                    type="submit">Save and return to profiles page</button>
            </form>

            <Link to={'/Login'} >
                <button id="abortButton">Return without saving</button>
            </Link>
        </div>
    )
}

export default AddProfile;
