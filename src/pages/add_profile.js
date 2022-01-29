import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import sendAsync from '../db_connect/renderer';


function AddProfile() {
  let history = useNavigate();

  const [state, setState] = React.useState({ newUsername: ""});
  const handleSubmit = e => {
    e.preventDefault();
    // //log state.author, state.book, state.isbn to the database instead of console
    if( state.newUsername )
    {
      var sqlInsert = "INSERT INTO users(username)\nVALUES(?);";
      var params = [state.newUsername];
      console.log("sql string: \n" + sqlInsert)
      sendAsync(sqlInsert, params)
      .then((result) => console.log(result))
      .then(history('/Login'));
    }
    else {
      console.log("empty username string");
      window.alert("Username " + state.newUsername + " is invalid. Please try again.")
    }
  };
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
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
